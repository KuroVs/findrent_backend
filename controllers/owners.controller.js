const ownersService = require('../services/owners.service');

const getOwners = async (req, res) => {
    try {
        const owners = await ownersService.getAll();
        res.status(200).json(owners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOwnerById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const owner = await ownersService.getById(id);

        if (!owner) {
            return res.status(404).json({ message: 'Owner not found' });
        }

        res.status(200).json(owner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createOwner = async (req, res) => {
    try {
        const owner = await ownersService.create(req.body);
        res.status(201).json(owner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ✅ NUEVO
const updateOwner = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updated = await ownersService.update(id, req.body);
        res.status(200).json(updated);
    } catch (error) {
        const status = error.message === 'Owner not found' ? 404 : 400;
        res.status(status).json({ message: error.message });
    }
};

// ✅ NUEVO
const deleteOwner = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await ownersService.remove(id);
        res.status(200).json(result);
    } catch (error) {
        const status = error.message === 'Owner not found' ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};

module.exports = {
    getOwners,
    getOwnerById,
    createOwner,
    updateOwner,
    deleteOwner
};