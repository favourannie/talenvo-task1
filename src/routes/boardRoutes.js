const express = require("express")
const {createBoard, updateBoard, getBoardById, deleteBoard, getUserBoards } = require("../controllers/boardController")
const authMiddleware = require("../middleware/authMiddleware")
const { createBoardSchema, updateBoardSchema, validate } = require("../validation/validation")
const router = express.Router()

/**
 * @swagger
 * /boards:
 *   post:
 *     summary: Create a new board
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: Board title
 *               description:
 *                 type: string
 *                 description: Board description (optional)
 *     responses:
 *       201:
 *         description: Board created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/boards", authMiddleware , validate(createBoardSchema), createBoard)

/**
 * @swagger
 * /boards:
 *   get:
 *     summary: Get all boards for the authenticated user
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of boards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/boards", authMiddleware,  getUserBoards)

/**
 * @swagger
 * /boards/{id}:
 *   get:
 *     summary: Get a board by ID
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Board ID
 *     responses:
 *       200:
 *         description: Board details
 *       404:
 *         description: Board not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/boards/:id", authMiddleware, getBoardById)

/**
 * @swagger
 * /boards/{id}:
 *   put:
 *     summary: Update a board
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Board ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Board title
 *               description:
 *                 type: string
 *                 description: Board description
 *     responses:
 *       200:
 *         description: Board updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Board not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.put("/boards/:id", authMiddleware, validate(updateBoardSchema), updateBoard)

/**
 * @swagger
 * /boards/{id}:
 *   delete:
 *     summary: Delete a board
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Board ID
 *     responses:
 *       200:
 *         description: Board deleted successfully
 *       404:
 *         description: Board not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete("/boards/:id",authMiddleware , deleteBoard)

module.exports = router