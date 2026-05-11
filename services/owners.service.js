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
    const [owner] = await db('owners')
        .insert(data)
        .returning('*');
    return owner;
};

const update = async (id, data) => {
    const owner = await db('owners')
        .where({ id })
        .first();

    if (!owner) {
        throw new Error('Owner not found');
    }

    const [updated] = await db('owners')
        .where({ id })
        .update({
            ...data,
            updated_at: db.fn.now()
        })
        .returning('*');

    return updated;
};

const remove = async (id) => {
    const owner = await db('owners')
        .where({ id })
        .first();

    if (!owner) {
        throw new Error('Owner not found');
    }

    await db('owners')
        .where({ id })
        .delete();

    return { message: 'Owner deleted successfully' };
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};