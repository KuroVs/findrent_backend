const db = require('../config/db');

const getAll = async () => {
    return await db('amenities').select('*');
};

const getById = async (id) => {
    return await db('amenities')
        .where({ id })
        .first();
};

const create = async (data) => {
    const existing = await db('amenities')
        .where({ name: data.name })
        .first()
    if (existing) throw new Error('Ya existe una amenidad con este nombre')

    const [amenity] = await db('amenities')
        .insert(data)
        .returning('*')
    return amenity
}

// ✅ NUEVO
const update = async (id, data) => {

    const amenity = await db('amenities')
        .where({ id })
        .first();

    if (!amenity) throw new Error('Amenidad no encontrada')

    // Si mandan un name que ya existe en otra amenidad, Postgres lanzará
    // error por el unique constraint. Lo capturamos con un mensaje claro.
    if (data.name) {
        const existing = await db('amenities')
            .where({ name: data.name })
            .whereNot({ id })
            .first();

        if (existing) throw new Error('Ya existe una amenidad con este nombre')
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

    if (!amenity) throw new Error('Amenidad no encontrada')

    // Verificar si alguna propiedad está usando esta amenidad
    const inUse = await db('property_amenities')
        .where({ amenity_id: id })
        .first();

    if (inUse) throw new Error('No se puede eliminar porque está en uso')

    await db('amenities')
        .where({ id })
        .delete();

    return { message: 'Amenidad eliminada exitosamente' };
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};