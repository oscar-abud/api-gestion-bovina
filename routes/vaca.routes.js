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
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado de la vaca
 *           example: 6916b1607016fcd59fb239e8
 *         diio:
 *           type: integer
 *           description: Número de identificación individual oficial
 *           example: 345671
 *         dateBirthday:
 *           type: string
 *           format: date-time
 *           description: Fecha de nacimiento de la vaca
 *           example: 2022-05-11T00:00:00.000Z
 *         genre:
 *           type: string
 *           enum: [M, F]
 *           description: Género de la vaca (M = Macho, F = Hembra)
 *           example: F
 *         race:
 *           type: string
 *           description: Raza de la vaca
 *           example: Negra
 *         location:
 *           type: string
 *           description: Ubicación actual de la vaca
 *           example: Talca
 *         sick:
 *           type: string
 *           nullable: true
 *           description: Enfermedad actual de la vaca (null si está sana)
 *           example: null
 *         cowState:
 *           type: boolean
 *           description: Estado de la vaca (true = activa, false = inactiva)
 *           example: true
 *     VacaInput:
 *       type: object
 *       required:
 *         - diio
 *         - dateBirthday
 *         - genre
 *         - race
 *         - location
 *       properties:
 *         diio:
 *           type: integer
 *           description: Número de identificación individual oficial
 *           example: 345671
 *         dateBirthday:
 *           type: string
 *           format: date-time
 *           description: Fecha de nacimiento de la vaca
 *           example: 2022-05-11T00:00:00.000Z
 *         genre:
 *           type: string
 *           enum: [M, F]
 *           description: Género de la vaca (M = Macho, F = Hembra)
 *           example: F
 *         race:
 *           type: string
 *           description: Raza de la vaca
 *           example: Negra
 *         location:
 *           type: string
 *           description: Ubicación de la vaca
 *           example: Talca
 *         sick:
 *           type: string
 *           nullable: true
 *           description: Enfermedad actual (opcional, puede ser null)
 *           example: null
 *     VacaUpdateInput:
 *       type: object
 *       properties:
 *         diio:
 *           type: integer
 *           description: Número de identificación individual oficial
 *           example: 345671
 *         dateBirthday:
 *           type: string
 *           format: date-time
 *           description: Fecha de nacimiento de la vaca
 *           example: 2022-05-11T00:00:00.000Z
 *         genre:
 *           type: string
 *           enum: [M, F]
 *           description: Género de la vaca (M = Macho, F = Hembra)
 *           example: F
 *         race:
 *           type: string
 *           description: Raza de la vaca
 *           example: Holstein
 *         location:
 *           type: string
 *           description: Ubicación de la vaca
 *           example: Santiago
 *         sick:
 *           type: string
 *           nullable: true
 *           description: Enfermedad actual (puede ser null)
 *           example: Mastitis
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
 *     description: Retorna todas las vacas con cowState = true. Permite filtrar por DIIO y género.
 *     tags: [Vacas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: diio
 *         schema:
 *           type: integer
 *         description: Filtrar por número DIIO específico
 *         example: 345671
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *           enum: [M, F]
 *         description: Filtrar por género (M = Macho, F = Hembra)
 *         example: F
 *     responses:
 *       200:
 *         description: Lista de vacas activas que cumplen con los filtros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vaca'
 *             examples:
 *               todasLasVacas:
 *                 summary: Sin filtros
 *                 value:
 *                   - _id: 6916b1607016fcd59fb239e8
 *                     diio: 345671
 *                     dateBirthday: 2022-05-11T00:00:00.000Z
 *                     genre: F
 *                     race: Negra
 *                     location: Talca
 *                     sick: null
 *                     cowState: true
 *                   - _id: 6916b1607016fcd59fb239e9
 *                     diio: 345672
 *                     dateBirthday: 2021-03-15T00:00:00.000Z
 *                     genre: M
 *                     race: Holstein
 *                     location: Santiago
 *                     sick: null
 *                     cowState: true
 *               filtradoPorGenero:
 *                 summary: Filtrado por género femenino
 *                 value:
 *                   - _id: 6916b1607016fcd59fb239e8
 *                     diio: 345671
 *                     dateBirthday: 2022-05-11T00:00:00.000Z
 *                     genre: F
 *                     race: Negra
 *                     location: Talca
 *                     sick: null
 *                     cowState: true
 *               filtradoPorDIIO:
 *                 summary: Búsqueda por DIIO específico
 *                 value:
 *                   - _id: 6916b1607016fcd59fb239e8
 *                     diio: 345671
 *                     dateBirthday: 2022-05-11T00:00:00.000Z
 *                     genre: F
 *                     race: Negra
 *                     location: Talca
 *                     sick: null
 *                     cowState: true
 *       404:
 *         description: No se encontraron vacas con los filtros especificados
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: No hay vacas registradas con esos filtros
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Error al obtener las vacas
 */
router.get("/", isAuthenticated, Vaca.list);

/**
 * @swagger
 * /vacas/all:
 *   get:
 *     summary: Obtener todas las vacas
 *     description: Retorna todas las vacas independiente de su estado (activas e inactivas)
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
 *     description: Retorna todas las vacas con cowState = false. Permite filtrar por DIIO y género.
 *     tags: [Vacas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: diio
 *         schema:
 *           type: integer
 *         description: Filtrar por número DIIO específico
 *         example: 345671
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *           enum: [M, F]
 *         description: Filtrar por género (M = Macho, F = Hembra)
 *         example: M
 *     responses:
 *       200:
 *         description: Lista de vacas desactivadas que cumplen con los filtros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vaca'
 *             examples:
 *               todasDesactivadas:
 *                 summary: Todas las vacas desactivadas
 *                 value:
 *                   - _id: 6916b1607016fcd59fb239ea
 *                     diio: 345673
 *                     dateBirthday: 2020-01-10T00:00:00.000Z
 *                     genre: M
 *                     race: Angus
 *                     location: Curicó
 *                     sick: Tuberculosis
 *                     cowState: false
 *               filtradaDesactivada:
 *                 summary: Vacas desactivadas filtradas por género
 *                 value:
 *                   - _id: 6916b1607016fcd59fb239ea
 *                     diio: 345673
 *                     dateBirthday: 2020-01-10T00:00:00.000Z
 *                     genre: F
 *                     race: Jersey
 *                     location: Rancagua
 *                     sick: null
 *                     cowState: false
 *       404:
 *         description: No se encontraron vacas desactivadas con los filtros especificados
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: No hay vacas eliminadas
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Error al obtener las vacas eliminadas
 */
router.get("/desactivadas", isAuthenticated, Vaca.listDelete);

/**
 * @swagger
 * /vacas/{id}:
 *   get:
 *     summary: Obtener vaca por ID
 *     description: Retorna una vaca específica según su ID de MongoDB
 *     tags: [Vacas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de MongoDB de la vaca
 *         example: 6916b1607016fcd59fb239e8
 *     responses:
 *       200:
 *         description: Vaca encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vaca'
 *             example:
 *               _id: 6916b1607016fcd59fb239e8
 *               diio: 345671
 *               dateBirthday: 2022-05-11T00:00:00.000Z
 *               genre: F
 *               race: Negra
 *               location: Talca
 *               sick: null
 *               cowState: true
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
 *     description: Registra una nueva vaca en el sistema. El campo cowState se establecerá automáticamente en true.
 *     tags: [Vacas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VacaInput'
 *           example:
 *             diio: 345671
 *             dateBirthday: 2022-05-11T00:00:00.000Z
 *             genre: F
 *             race: Negra
 *             location: Talca
 *             sick: null
 *     responses:
 *       201:
 *         description: Vaca creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vaca'
 *             example:
 *               _id: 6916b1607016fcd59fb239e8
 *               diio: 345671
 *               dateBirthday: 2022-05-11T00:00:00.000Z
 *               genre: F
 *               race: Negra
 *               location: Talca
 *               sick: null
 *               cowState: true
 *       400:
 *         description: Datos inválidos o DIIO duplicado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: El DIIO ya existe en el sistema
 *       401:
 *         description: No autorizado
 */
router.post("/", isAuthenticated, Vaca.create);

/**
 * @swagger
 * /vacas/{id}:
 *   put:
 *     summary: Actualizar vaca completamente
 *     description: Actualiza todos los campos de una vaca. Todos los campos requeridos deben enviarse.
 *     tags: [Vacas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de MongoDB de la vaca
 *         example: 6916b1607016fcd59fb239e8
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VacaInput'
 *           example:
 *             diio: 345671
 *             dateBirthday: 2022-05-11T00:00:00.000Z
 *             genre: F
 *             race: Holstein
 *             location: Santiago
 *             sick: Mastitis
 *     responses:
 *       200:
 *         description: Vaca actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vaca'
 *       404:
 *         description: Vaca no encontrada
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.put("/:id", isAuthenticated, Vaca.update);

/**
 * @swagger
 * /vacas/{id}:
 *   patch:
 *     summary: Actualizar vaca parcialmente
 *     description: Actualiza solo los campos especificados de una vaca. Los campos no enviados permanecen sin cambios.
 *     tags: [Vacas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de MongoDB de la vaca
 *         example: 6916b1607016fcd59fb239e8
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VacaUpdateInput'
 *           examples:
 *             actualizarUbicacion:
 *               summary: Actualizar solo ubicación
 *               value:
 *                 location: Concepción
 *             actualizarEnfermedad:
 *               summary: Registrar enfermedad
 *               value:
 *                 sick: Fiebre aftosa
 *             curarVaca:
 *               summary: Marcar vaca como sana
 *               value:
 *                 sick: null
 *             actualizarMultiples:
 *               summary: Actualizar múltiples campos
 *               value:
 *                 location: Valparaíso
 *                 sick: null
 *                 race: Angus
 *     responses:
 *       200:
 *         description: Vaca actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vaca'
 *       404:
 *         description: Vaca no encontrada
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.patch("/:id", isAuthenticated, Vaca.update);

/**
 * @swagger
 * /vacas/{id}:
 *   delete:
 *     summary: Eliminar/desactivar vaca
 *     description: Realiza un soft delete cambiando cowState a false. La vaca no se elimina físicamente de la base de datos.
 *     tags: [Vacas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de MongoDB de la vaca
 *         example: 6916b1607016fcd59fb239e8
 *     responses:
 *       200:
 *         description: Vaca desactivada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Vaca eliminada exitosamente
 *                 vaca:
 *                   $ref: '#/components/schemas/Vaca'
 *       404:
 *         description: Vaca no encontrada
 *       401:
 *         description: No autorizado
 */
router.delete("/:id", isAuthenticated, Vaca.destroy);

module.exports = router;