const amenitiesService = require('../services/amenities.service');

const getAllAmenities = async (req, res) => {
    try {
        const amenities = await amenitiesService.getAll();
        res.json(amenities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAmenityById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const amenity = await amenitiesService.getById(id);

        if (!amenity) {
            return res.status(404).json({ message: 'Amenity not found' });
        }

        res.json(amenity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createAmenity = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const newAmenity = await amenitiesService.create({ name, description });
        res.status(201).json(newAmenity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ✅ NUEVO
const updateAmenity = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updated = await amenitiesService.update(id, req.body);
        res.status(200).json(updated);
    } catch (error) {
        const status = error.message === 'Amenity not found' ? 404 : 400;
        res.status(status).json({ message: error.message });
    }
};

// ✅ NUEVO
const deleteAmenity = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await amenitiesService.remove(id);
        res.status(200).json(result);
    } catch (error) {
        const status = error.message === 'Amenity not found' ? 404 : 400;
        res.status(status).json({ message: error.message });
    }
};

module.exports = {
    getAllAmenities,
    getAmenityById,
    createAmenity,
    updateAmenity,
    deleteAmenity
};