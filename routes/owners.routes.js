const express = require('express');
const router = express.Router();
const ownersController = require('../controllers/owners.controller');


/**
 * @swagger
 * tags:
 *   name: Owners
 *   description: Gestión de propietarios
 */

/**
 * @swagger
 * /owners:
 *   get:
 *     summary: Obtener todos los propietarios
 *     tags: [Owners]
 *     responses:
 *       200:
 *         description: Lista de propietarios
 */
router.get('/', ownersController.getOwners);

/**
 * @swagger
 * /owners/{id}:
 *   get:
 *     summary: Obtener propietario por ID
 *     tags: [Owners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Propietario encontrado
 *       404:
 *         description: Propietario no encontrado
 */
router.get('/:id', ownersController.getOwnerById);

/**
 * @swagger
 * /owners:
 *   post:
 *     summary: Crear un propietario
 *     tags: [Owners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *             properties:
 *               type_document:
 *                 type: string
 *                 example: CC
 *               number_document:
 *                 type: string
 *                 example: "1234567890"
 *               full_name:
 *                 type: string
 *                 example: Carlos
 *               last_name:
 *                 type: string
 *                 example: Ramirez
 *               email:
 *                 type: string
 *                 example: carlos@email.com
 *               phone:
 *                 type: string
 *                 example: "3001234567"
 *     responses:
 *       201:
 *         description: Propietario creado
 */
router.post('/', ownersController.createOwner);

/**
 * @swagger
 * /owners/{id}:
 *   patch:
 *     summary: Actualizar propietario
 *     tags: [Owners]
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
 *               full_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Propietario actualizado
 *       404:
 *         description: Propietario no encontrado
 */
router.patch('/:id', ownersController.updateOwner);

/**
 * @swagger
 * /owners/{id}:
 *   delete:
 *     summary: Eliminar propietario
 *     tags: [Owners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Propietario eliminado
 *       404:
 *         description: Propietario no encontrado
 */
router.delete('/:id', ownersController.deleteOwner);

module.exports = router;