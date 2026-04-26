const db = require('../config/db');

const buildPropertyObject = (row) => ({
    id: row.property_id,
    title: row.title,
    price: parseFloat(row.price),
    city: row.city,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    area_m2: parseFloat(row.area_m2),
    owner: {
        id: parseInt(row.owner_id),
        full_name: row.full_name,
        last_name: row.last_name,
        phone: row.phone,
        email: row.email
    },
    amenities: []
});

const getAll = async (filters = {}) => {

    const page   = parseInt(filters.page)  || 1;
    const limit  = parseInt(filters.limit) || 10;
    const offset = (page - 1) * limit;

    // ── Función helper para aplicar filtros a cualquier query ──
    const applyFilters = (q) => {
        if (filters.city) {
            q.whereILike('p.city', `%${filters.city}%`);
        }
        if (filters.min_price) {
            q.where('p.price', '>=', parseFloat(filters.min_price));
        }
        if (filters.max_price) {
            q.where('p.price', '<=', parseFloat(filters.max_price));
        }
        if (filters.bedrooms) {
            q.where('p.bedrooms', parseInt(filters.bedrooms));
        }
        if (filters.bathrooms) {
            q.where('p.bathrooms', parseInt(filters.bathrooms));
        }
        return q;
    };

    // ── Paso 1: obtener solo los IDs de la página actual ──
    // Hacemos esto antes del JOIN con amenities para que el limit/offset
    // cuente propiedades, no filas del JOIN.
    const idsQuery = db('properties as p')
        .join('owners as o', 'p.owner_id', 'o.id')
        .select('p.id')
        .limit(limit)
        .offset(offset);

    applyFilters(idsQuery);

    const propertyIds = (await idsQuery).map(r => r.id);

    if (propertyIds.length === 0) {
        return { data: [], page, limit, total: 0, totalPages: 0 };
    }

    // ── Paso 2: total de propiedades (sin limit) para calcular páginas ──
    const totalQuery = db('properties as p')
        .join('owners as o', 'p.owner_id', 'o.id')
        .count('p.id as count');

    applyFilters(totalQuery);

    const [{ count }] = await totalQuery;

    // ── Paso 3: traer los datos completos solo de los IDs de esta página ──
    const rows = await db('properties as p')
        .join('owners as o', 'p.owner_id', 'o.id')
        .leftJoin('property_amenities as pa', 'p.id', 'pa.property_id')
        .leftJoin('amenities as a', 'pa.amenity_id', 'a.id')
        .whereIn('p.id', propertyIds)
        .select(
            'p.id as property_id',
            'p.title',
            'p.price',
            'p.city',
            'p.bedrooms',
            'p.bathrooms',
            'p.area_m2',
            'o.id as owner_id',
            'o.full_name',
            'o.last_name',
            'o.email',
            'o.phone',
            'a.id as amenity_id',
            'a.name as amenity_name',
            'a.description as amenity_description'
        );

    const propertiesMap = {};

    rows.forEach(row => {
        if (!propertiesMap[row.property_id]) {
            propertiesMap[row.property_id] = buildPropertyObject(row);
        }
        if (row.amenity_id) {
            propertiesMap[row.property_id].amenities.push({
                id: row.amenity_id,
                name: row.amenity_name,
                description: row.amenity_description
            });
        }
    });

    return {
        data: Object.values(propertiesMap),
        page,
        limit,
        total: parseInt(count),
        totalPages: Math.ceil(parseInt(count) / limit)
    };
};

const getById = async (id) => {

    const rows = await db('properties as p')
        .join('owners as o', 'p.owner_id', 'o.id')
        .leftJoin('property_amenities as pa', 'p.id', 'pa.property_id')
        .leftJoin('amenities as a', 'pa.amenity_id', 'a.id')
        .where('p.id', id)
        .select(
            'p.id as property_id',
            'p.title',
            'p.description',
            'p.price',
            'p.city',
            'p.address',
            'p.bedrooms',
            'p.bathrooms',
            'p.area_m2',
            'o.id as owner_id',
            'o.full_name',
            'o.last_name',
            'o.phone',
            'o.email',
            'a.id as amenity_id',
            'a.name as amenity_name',
            'a.description as amenity_description'
        );

    if (rows.length === 0) return null;

    const property = {
        ...buildPropertyObject(rows[0]),
        description: rows[0].description,
        address: rows[0].address
    };

    rows.forEach(row => {
        if (row.amenity_id) {
            property.amenities.push({
                id: row.amenity_id,
                name: row.amenity_name,
                description: row.amenity_description
            });
        }
    });

    return property;
};

const create = async ({
    owner_id, title, description, price,
    city, address, bedrooms, bathrooms, area_m2
}) => {
    const owner = await db('owners').where({ id: owner_id }).first();
    if (!owner) throw new Error('Owner not found');
    if (price <= 0) throw new Error('Price must be greater than 0');

    const [property] = await db('properties')
        .insert({ owner_id, title, description, price, city, address, bedrooms, bathrooms, area_m2 })
        .returning('*');

    return property;
};

const addAmenities = async (property_id, amenity_ids) => {

    const property = await db('properties').where({ id: property_id }).first();
    if (!property) throw new Error('Property not found');

    const rows = amenity_ids.map(amenity_id => ({ property_id, amenity_id }));
    await db('property_amenities').insert(rows);

    return { message: 'Amenities added to property' };
};

const update = async (id, data) => {

    const property = await db('properties').where({ id }).first();
    if (!property) throw new Error('Property not found');

    if (data.owner_id) {
        const owner = await db('owners').where({ id: data.owner_id }).first();
        if (!owner) throw new Error('Owner not found');
    }

    if (data.price !== undefined && data.price <= 0) {
        throw new Error('Price must be greater than 0');
    }

    const [updated] = await db('properties')
        .where({ id })
        .update({ ...data, updated_at: db.fn.now() })
        .returning('*');

    return updated;
};

const removeAmenity = async (property_id, amenity_id) => {

    const property = await db('properties').where({ id: property_id }).first();
    if (!property) throw new Error('Property not found');

    const relation = await db('property_amenities')
        .where({ property_id, amenity_id })
        .first();
    if (!relation) throw new Error('Amenity not found in this property');

    await db('property_amenities')
        .where({ property_id, amenity_id })
        .delete();

    return { message: 'Amenity removed from property' };
};

const remove = async (id) => {

    const property = await db('properties').where({ id }).first();
    if (!property) throw new Error('Property not found');

    await db('properties').where({ id }).delete();

    return { message: 'Property deleted successfully' };
};

module.exports = {
    getAll,
    getById,
    create,
    addAmenities,
    update,
    removeAmenity,
    remove
};