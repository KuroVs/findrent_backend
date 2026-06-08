const express = require('express');
const router = express.Router();
const propertiesController = require('../controllers/properties.controller');

/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Gestión de propiedades
 */

/**
 * @swagger
 * /properties:
 *   get:
 *     summary: Obtener todas las propiedades
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         example:
 *       - in: query
 *         name: min_price
 *         schema:
 *           type: number
 *         example: 
 *       - in: query
 *         name: max_price
 *         schema:
 *           type: number
 *         example: 
 *       - in: query
 *         name: bedrooms
 *         schema:
 *           type: integer
 *         example: 
 *       - in: query
 *         name: bathrooms
 *         schema:
 *           type: integer
 *         example: 
 *       - in: query
 *         name: operation_type
 *         schema:
 *           type: string
 *           enum: [SALE, RENT]
 *         example: SALE
 *     responses:
 *       200:
 *         description: Lista paginada de propiedades con filtros
 */
router.get('/', propertiesController.getAllProperties);

/**
 * @swagger
 * /properties/{id}:
 *   get:
 *     summary: Obtener propiedad por ID
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Propiedad encontrada
 *       404:
 *         description: Propiedad no encontrada
 */
router.get('/:id', propertiesController.getPropertyById);

/**
 * @swagger
 * /properties:
 *   post:
 *     summary: Crear una propiedad
 *     tags: [Properties]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - owner_id
 *               - title
 *               - price
 *               - city
 *               - address
 *               - bedrooms
 *               - bathrooms
 *               - operation_type
 *             properties:
 *               owner_id:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: Apartamento Centro
 *               description:
 *                 type: string
 *                 example: Amplio apartamento en el centro
 *               price:
 *                 type: number
 *                 example: 1200000
 *               city:
 *                 type: string
 *                 example: Medellin
 *               address:
 *                 type: string
 *                 example: El Poblado
 *               bedrooms:
 *                 type: integer
 *                 example: 2
 *               bathrooms:
 *                 type: integer
 *                 example: 1
 *               area_m2:
 *                 type: number
 *                 example: 60
 *               operation_type:
 *                 type: string
 *                 enum: [SALE, RENT]
 *                 example: RENT
 *     responses:
 *       201:
 *         description: Propiedad creada correctamente
 */
router.post('/', propertiesController.createProperty);

/**
 * @swagger
 * /properties/{id}/amenities:
 *   post:
 *     summary: Agregar amenidades a una propiedad
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amenity_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Amenidades agregadas correctamente
 */
router.post('/:id/amenities', propertiesController.addAmenitiesToProperty);

/**
 * @swagger
 * /properties/{id}:
 *   patch:
 *     summary: Actualizar propiedad
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *               bedrooms:
 *                 type: integer
 *               bathrooms:
 *                 type: integer
 *               area_m2:
 *                 type: number
 *               is_active:
 *                 type: boolean
 *               operation_type:
 *                 type: string
 *                 enum: [SALE, RENT]
 *     responses:
 *       200:
 *         description: Propiedad actualizada correctamente
 *       404:
 *         description: Propiedad no encontrada
 */
router.patch('/:id', propertiesController.updateProperty);

/**
 * @swagger
 * /properties/{id}/amenities/{amenityId}:
 *   delete:
 *     summary: Eliminar amenidad de una propiedad
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: amenityId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Amenidad eliminada de la propiedad
 *       404:
 *         description: No encontrado
 */
router.delete('/:id/amenities/:amenityId', propertiesController.removeAmenityFromProperty);

/**
 * @swagger
 * /properties/{id}:
 *   delete:
 *     summary: Eliminar propiedad
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Propiedad eliminada correctamente
 *       404:
 *         description: Propiedad no encontrada
 */
router.delete('/:id', propertiesController.deleteProperty);

module.exports = router;