const propertiesService = require('../services/properties.service');

const getAllProperties = async (req, res) => {
    try {
        const properties = await propertiesService.getAll(req.query);
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPropertyById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const property = await propertiesService.getById(id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProperty = async (req, res) => {
    try {
        const newProperty = await propertiesService.create(req.body);
        res.status(201).json(newProperty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const addAmenitiesToProperty = async (req, res) => {
    const property_id = parseInt(req.params.id);
    const { amenity_ids } = req.body;

    try {
        const result = await propertiesService.addAmenities(property_id, amenity_ids);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ✅ NUEVO
const updateProperty = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updated = await propertiesService.update(id, req.body);
        res.status(200).json(updated);
    } catch (error) {
        const status = error.message === 'Property not found' ? 404 : 400;
        res.status(status).json({ message: error.message });
    }
};

// ✅ NUEVO
const removeAmenityFromProperty = async (req, res) => {
    try {
        const property_id = parseInt(req.params.id);
        const amenity_id = parseInt(req.params.amenityId);
        const result = await propertiesService.removeAmenity(property_id, amenity_id);
        res.status(200).json(result);
    } catch (error) {
        const status = error.message.includes('not found') ? 404 : 400;
        res.status(status).json({ message: error.message });
    }
};

// ✅ NUEVO
const deleteProperty = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await propertiesService.remove(id);
        res.status(200).json(result);
    } catch (error) {
        const status = error.message === 'Property not found' ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};

module.exports = {
    getAllProperties,
    getPropertyById,
    createProperty,
    addAmenitiesToProperty,
    updateProperty,
    removeAmenityFromProperty,
    deleteProperty
};