const express = require("express")
const {createColumn, updateColumn, deleteColumn} = require("../controllers/columnController")
const {validate, createColumnSchema, updateColumnSchema} = require("../validation/validation")
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router()
/**
 * @swagger
 * /columns/{boardId}:
 *   post:
 *     summary: Create a new column in a board
 *     tags: [Columns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         description: ID of the board where the column will be created
 *         schema:
 *           type: string
 *           format: uuid
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
 *                 example: "To Do"
 *     responses:
 *       201:
 *         description: Column created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Column created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 9e7e21e2-3c14-4e61-a7df-6d2b7e6c1f3c
 *                     boardId:
 *                       type: string
 *                       example: 9e7e21e2-3c14-4e61-a7df-6d2b7e6c1f3c
 *                     title:
 *                       type: string
 *                       example: To Do
 *       404:
 *         description: Board not found
 *       500:
 *         description: Server error
 */
router.post("/columns/:boardId", authMiddleware, validate(createColumnSchema),createColumn)
/**
 * @swagger
 * /columns/{boardId}/{columnId}:
 *   put:
 *     summary: Update a column
 *     tags: [Columns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         description: ID of the board
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: columnId
 *         required: true
 *         description: ID of the column to update
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "In Progress"
 *     responses:
 *       200:
 *         description: Column updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Column updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 7f1c2a7e-1234-4d67-b7e2-9c8d4f0b9e55
 *                     boardId:
 *                       type: string
 *                       example: 7f1c2a7e-1234-4d67-b7e2-9c8d4f0b9e55
 *                     title:
 *                       type: string
 *                       example: In Progress
 *       404:
 *         description: Board or column not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Board not found
 *       500:
 *         description: Server error
 */
router.put("/columns/:boardId/:columnId", authMiddleware, validate(updateColumnSchema), updateColumn)

/**
 * @swagger
 * /columns/{boardId}/{columnId}:
 *   delete:
 *     summary: Delete a column
 *     description: Deletes a column from a board. Only the owner of the board can delete its columns.
 *     tags: [Columns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         description: ID of the board the column belongs to
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: columnId
 *         required: true
 *         description: ID of the column to delete
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Column deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Column deleted successfully
 *       404:
 *         description: Board or Column not found
 *         content:
 *           application/json:
 *             examples:
 *               boardNotFound:
 *                 value:
 *                   success: false
 *                   message: Board not found
 *               columnNotFound:
 *                 value:
 *                   success: false
 *                   message: Column not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Error deleting column
 */
router.delete("/columns/:boardId/:columnId", authMiddleware, deleteColumn)

module.exports = router