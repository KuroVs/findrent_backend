const db = require('../config/db');

const getAll = async (filters = {}) => {
    const page   = parseInt(filters.page)  || 1;
    const limit  = parseInt(filters.limit) || 10;
    const offset = (page - 1) * limit;

    const [{ count }] = await db('owners').count('id as count');

    const data = await db('owners')
        .select('*')
        .limit(limit)
        .offset(offset);

    return {
        data,
        page,
        limit,
        total: parseInt(count),
        totalPages: Math.ceil(parseInt(count) / limit)
    };
};

const getById = async (id) => {
    return await db('owners')
        .where({ id })
        .first();
};

const create = async (data) => {
    if (data.number_document) {
        const existing = await db('owners')
            .where({ number_document: data.number_document })
            .first()
        if (existing) throw new Error('Ya existe un propietario con este documento')
    }

    const [owner] = await db('owners')
        .insert(data)
        .returning('*')
    return owner
}

const update = async (id, data) => {
    const owner = await db('owners')
        .where({ id })
        .first()
    if (!owner) throw new Error('Propietario no encontrado')

    if (data.number_document) {
        const existing = await db('owners')
            .where({ number_document: data.number_document })
            .whereNot({ id })
            .first()
        if (existing) throw new Error('Ya existe un propietario con este documento')
    }

    const [updated] = await db('owners')
        .where({ id })
        .update({
            ...data,
            updated_at: db.fn.now()
        })
        .returning('*')
    return updated
}

const remove = async (id) => {
    const owner = await db('owners')
        .where({ id })
        .first();

    if (!owner) throw new Error('Propietario no encontrado')

    await db('owners')
        .where({ id })
        .delete();

    return { message: 'Propietario eliminado exitosamente' };
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};