const express = require('express');
const router = express.Router();
const amenitiesController = require('../controllers/amenities.controller');

/**
 * @swagger
 * tags:
 *   name: Amenities
 *   description: Gestión de amenidades
 */

/**
 * @swagger
 * /amenities:
 *   get:
 *     summary: Obtener todas las amenidades
 *     tags: [Amenities]
 *     responses:
 *       200:
 *         description: Lista de amenidades
 */
router.get('/', amenitiesController.getAllAmenities);

/**
 * @swagger
 * /amenities/{id}:
 *   get:
 *     summary: Obtener amenidad por ID
 *     tags: [Amenities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Amenidad encontrada
 *       404:
 *         description: Amenidad no encontrada
 */
router.get('/:id', amenitiesController.getAmenityById);

/**
 * @swagger
 * /amenities:
 *   post:
 *     summary: Crear una amenidad
 *     tags: [Amenities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gimnasio
 *               description:
 *                 type: string
 *                 example: Gimnasio equipado para residentes
 *     responses:
 *       201:
 *         description: Amenidad creada
 */
router.post('/', amenitiesController.createAmenity);

/**
 * @swagger
 * /amenities/{id}:
 *   patch:
 *     summary: Actualizar amenidad
 *     tags: [Amenities]
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Amenidad actualizada
 *       404:
 *         description: Amenidad no encontrada
 */
router.patch('/:id', amenitiesController.updateAmenity);

/**
 * @swagger
 * /amenities/{id}:
 *   delete:
 *     summary: Eliminar amenidad
 *     tags: [Amenities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Amenidad eliminada
 *       400:
 *         description: Amenidad en uso por propiedades
 *       404:
 *         description: Amenidad no encontrada
 */
router.delete('/:id', amenitiesController.deleteAmenity);

module.exports = router;