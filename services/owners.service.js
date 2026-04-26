const db = require('../config/db');

const getAll = async () => {
    return await db('owners').select('*');
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

// ✅ NUEVO
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

// ✅ NUEVO
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