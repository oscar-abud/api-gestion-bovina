const express = require("express");
const router = express.Router();
const Vaca = require("../controller/vaca.controller");
const { isAuthenticated } = require("../controller/auth.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Vaca:
 *       type: object
 *       required:
 *         - nombre
 *         - raza
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado de la vaca
 *           example: 507f1f77bcf86cd799439011
 *         nombre:
 *           type: string
 *           description: Nombre de la vaca
 *           example: Lola
 *         raza:
 *           type: string
 *           description: Raza de la vaca
 *           example: Holstein
 *         edad:
 *           type: number
 *           description: Edad en años
 *           example: 3
 *         peso:
 *           type: number
 *           description: Peso en kilogramos
 *           example: 450
 *         estado:
 *           type: string
 *           enum: [activo, inactivo]
 *           description: Estado de la vaca
 *           example: activo
 *         fechaNacimiento:
 *           type: string
 *           format: date
 *           example: 2021-05-15
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     VacaInput:
 *       type: object
 *       required:
 *         - nombre
 *         - raza
 *       properties:
 *         nombre:
 *           type: string
 *           example: Lola
 *         raza:
 *           type: string
 *           example: Holstein
 *         edad:
 *           type: number
 *           example: 3
 *         peso:
 *           type: number
 *           example: 450
 *         fechaNacimiento:
 *           type: string
 *           format: date
 *           example: 2021-05-15
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Error al procesar la solicitud
 */

/**
 * @swagger
 * /vacas:
 *   get:
 *     summary: Obtener lista de vacas activas
 *     tags: [Vacas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vacas activas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vaca'
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", isAuthenticated, Vaca.list);

/**
 * @swagger
 * /vacas/all:
 *   get:
 *     summary: Obtener todas las vacas (activas e inactivas)
 *     tags: [Vacas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Todas las vacas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vaca'
 *       401:
 *         description: No autorizado
 */
router.get("/all", isAuthenticated, Vaca.getAll);

/**
 * @swagger
 * /vacas/desactivadas:
 *   get:
 *     summary: Obtener vacas desactivadas
 *     tags: [Vacas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vacas desactivadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vaca'
 *       401:
 *         description: No autorizado
 */
router.get("/desactivadas", isAuthenticated, Vaca.listDelete);

/**
 * @swagger
 * /vacas/{id}:
 *   get:
 *     summary: Obtener vaca por ID
 *     tags: [Vacas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la vaca
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Vaca encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vaca'
 *       404:
 *         description: Vaca no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 */
router.get("/:id", isAuthenticated, Vaca.getById);

/**
 * @swagger
 * /vacas:
 *   post:
 *     summary: Crear nueva vaca
 *     tags: [Vacas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VacaInput'
 *     responses:
 *       201:
 *         description: Vaca creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vaca'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 */
router.post("/", isAuthenticated, Vaca.create);

/**
 * @swagger
 * /vacas/{id}:
 *   put:
 *     summary: Actualizar vaca completamente
 *     tags: [Vacas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la vaca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VacaInput'
 *     responses:
 *       200:
 *         description: Vaca actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vaca'
 *       404:
 *         description: Vaca no encontrada
 *       401:
 *         description: No autorizado
 */
router.put("/:id", isAuthenticated, Vaca.update);

/**
 * @swagger
 * /vacas/{id}:
 *   patch:
 *     summary: Actualizar vaca parcialmente
 *     tags: [Vacas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la vaca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               raza:
 *                 type: string
 *               edad:
 *                 type: number
 *               peso:
 *                 type: number
 *     responses:
 *       200:
 *         description: Vaca actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vaca'
 *       404:
 *         description: Vaca no encontrada
 *       401:
 *         description: No autorizado
 */
router.patch("/:id", isAuthenticated, Vaca.update);

/**
 * @swagger
 * /vacas/{id}:
 *   delete:
 *     summary: Eliminar/desactivar vaca
 *     tags: [Vacas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la vaca
 *     responses:
 *       200:
 *         description: Vaca eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Vaca eliminada exitosamente
 *       404:
 *         description: Vaca no encontrada
 *       401:
 *         description: No autorizado
 */
router.delete("/:id", isAuthenticated, Vaca.destroy);

module.exports = router;