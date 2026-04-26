const db = require('../config/db');

const getAll = async () => {
    return await db('amenities').select('*');
};

const getById = async (id) => {
    return await db('amenities')
        .where({ id })
        .first();
};

const create = async ({ name, description }) => {
    const [amenity] = await db('amenities')
        .insert({ name, description })
        .returning('*');
    return amenity;
};

// ✅ NUEVO
const update = async (id, data) => {

    const amenity = await db('amenities')
        .where({ id })
        .first();

    if (!amenity) throw new Error('Amenity not found');

    // Si mandan un name que ya existe en otra amenidad, Postgres lanzará
    // error por el unique constraint. Lo capturamos con un mensaje claro.
    if (data.name) {
        const existing = await db('amenities')
            .where({ name: data.name })
            .whereNot({ id })
            .first();

        if (existing) throw new Error('Amenity name already exists');
    }

    const [updated] = await db('amenities')
        .where({ id })
        .update({
            ...data,
            updated_at: db.fn.now()
        })
        .returning('*');

    return updated;
};

// ✅ NUEVO
const remove = async (id) => {

    const amenity = await db('amenities')
        .where({ id })
        .first();

    if (!amenity) throw new Error('Amenity not found');

    // Verificar si alguna propiedad está usando esta amenidad
    const inUse = await db('property_amenities')
        .where({ amenity_id: id })
        .first();

    if (inUse) throw new Error('Amenity is in use by one or more properties');

    await db('amenities')
        .where({ id })
        .delete();

    return { message: 'Amenity deleted successfully' };
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};