const express = require("express")
const {createCard, updateCard, moveCard, setDueDate, addTag, getCardsByColumn, deleteCard } = require("../controllers/cardController")
const {validate, createCardSchema, updateCardSchema, setDueDateSchema} = require("../validation/validation")
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router()

/**
 * @swagger
 * /cards/{boardId}/{columnId}:
 *   post:
 *     summary: Create a new card
 *     description: Creates a new card inside a specific column of a board. Only the board owner can create cards.
 *     tags: [Cards]
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
 *         description: ID of the column where the card will be created
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
 *                 example: Finish backend API
 *               description:
 *                 type: string
 *                 example: Implement card creation endpoint
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-04-10T12:00:00Z
 *     responses:
 *       201:
 *         description: Card created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Card created successfully
 *               data:
 *                 id: "9b21c7c4-bc5e-4f56-9e4b-45bce1e23d11"
 *                 columnId: "c3b1c5a7-3f44-4df0-a45f-7c42e7d2a122"
 *                 title: Finish backend API
 *                 description: Implement card creation endpoint
 *                 dueDate: "2026-04-10T12:00:00Z"
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
 *               message: Error creating card
 */
router.post("/cards/:boardId/:columnId", authMiddleware, validate(createCardSchema), createCard)

/**
 * @swagger
 * /cards/{boardId}/{columnId}:
 *   get:
 *     summary: Get all cards in a column
 *     description: Retrieves all cards that belong to a specific column within a board. Only the board owner can access the cards.
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the board
 *       - in: path
 *         name: columnId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the column
 *     responses:
 *       200:
 *         description: Cards retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Cards retrieved successfully
 *               data:
 *                 - id: "4f73b0d3-98c0-4f89-b01e-20e8c4d5a1b3"
 *                   columnId: "a91b3a23-7c1f-4b63-bdc7-4a91c1f2c7b2"
 *                   title: Build authentication system
 *                   description: Implement JWT login
 *                   dueDate: "2026-04-01T12:00:00.000Z"
 *                   tags:
 *                     - id: "2d33e93c-7fa1-4d0c-bdb1-fcde7e7e9911"
 *                       name: Backend
 *                     - id: "6f54b61b-8f7e-4e44-9df3-89f9fa23f001"
 *                       name: Urgent
 *       404:
 *         description: Board or column not found
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
 *               message: Error getting cards by column
 */
router.get("/cards/:boardId/:columnId", authMiddleware, getCardsByColumn)

/**
 * @swagger
 * /cards/{boardId}/{columnId}/{cardId}:
 *   put:
 *     summary: Update a card
 *     description: Updates a card inside a specific column of a board. Only the board owner can update cards.
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the board
 *       - in: path
 *         name: columnId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the column containing the card
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the card to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Implement authentication
 *               description:
 *                 type: string
 *                 example: Add JWT login and signup endpoints
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-04-10T10:00:00Z
 *     responses:
 *       200:
 *         description: Card updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Card updated successfully
 *               data:
 *                 id: "3c12e23d-91fa-4e52-b8c0-9a6c52f0a123"
 *                 columnId: "2b45d9e1-98f3-4f28-b3cc-66fcb8ab91d0"
 *                 title: Implement authentication
 *                 description: Add JWT login and signup endpoints
 *                 dueDate: "2026-04-10T10:00:00Z"
 *       404:
 *         description: Board, column, or card not found
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
 *               cardNotFound:
 *                 value:
 *                   success: false
 *                   message: Card not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Error updating card
 */
router.put("/cards/:boardId/:columnId/:cardId", validate(updateCardSchema), updateCard)

/**
 * @swagger
 * /cards/{boardId}/{columnId}/{cardId}/due-date:
 *   post:
 *     summary: Set or update card due date
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: columnId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: cardId
 *         required: true
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
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-04-10T12:00:00Z
 *     responses:
 *       200:
 *         description: Due date set successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Due date set successfully
 *               data:
 *                 id: "card123"
 *                 dueDate: "2026-04-10T12:00:00Z"
 *       404:
 *         description: Board, column, or card not found
 *       500:
 *         description: Server error
 */
router.post("/cards/:boardId/:columnId/:cardId/due-date", authMiddleware, validate(setDueDateSchema), setDueDate)
/**
 * @swagger
 * /cards/{boardId}/{columnId}/{cardId}/tags:
 *   post:
 *     summary: Attach a tag to a card
 *     description: Adds an existing tag to a specific card within a column and board.
 *     tags:
 *       - Cards
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the board
 *       - in: path
 *         name: columnId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the column
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the card
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tagId:
 *                 type: string
 *                 example: "b8f6b7b3-3d23-4a72-9e3a-7c1d65f6e9a1"
 *     responses:
 *       200:
 *         description: Tag successfully attached to the card
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Tag attached to card successfully
 *       404:
 *         description: Board, Column, Card or Tag not found
 *       500:
 *         description: Server error
 */
router.post("/cards/:boardId/:columnId/:cardId/tags", authMiddleware, addTag)


/**
 * @swagger
 * /cards/{boardId}/{columnId}/{cardId}:
 *   delete:
 *     summary: Delete a card
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: columnId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Card deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Card deleted successfully
 *       404:
 *         description: Board, column, or card not found
 *       500:
 *         description: Server error
 */
router.delete("/cards/:boardId/:columnId/:cardId", authMiddleware, deleteCard)

/**
 * @swagger
 * /cards/move/{boardId}/{columnId}/{cardId}:
 *   put:
 *     summary: Move a card across columns or reorder within a column
 *     description: |
 *       Moves a card to a new column and/or position.
 *
 *       This operation:
 *       - Reorders cards in the destination column (shifts positions forward)
 *       - Reorders cards in the source column (closes position gaps)
 *       - Uses a database transaction to ensure consistency
 *
 *       ⚠️ Prevents duplicate positions and maintains ordering integrity.
 *
 *     tags: [Cards]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the board
 *
 *       - in: path
 *         name: columnId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Current column ID of the card
 *
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the card to move
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newColumnId
 *               - newPosition
 *             properties:
 *               newColumnId:
 *                 type: string
 *                 format: uuid
 *                 example: "c3b1c5a7-3f44-4df0-a45f-7c42e7d2a122"
 *                 description: Destination column ID
 *
 *               newPosition:
 *                 type: integer
 *                 example: 1
 *                 description: New position index in the destination column
 *
 *     responses:
 *       200:
 *         description: Card moved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: "9b21c7c4-bc5e-4f56-9e4b-45bce1e23d11"
 *                 columnId: "c3b1c5a7-3f44-4df0-a45f-7c42e7d2a122"
 *                 position: 1
 *                 title: "Finish backend API"
 *                 updatedAt: "2026-03-19T12:00:00.000Z"
 *
 *       400:
 *         description: Invalid input or position
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Invalid position value
 *
 *       404:
 *         description: Card or board not found
 *         content:
 *           application/json:
 *             examples:
 *               cardNotFound:
 *                 value:
 *                   success: false
 *                   message: Card not found
 *
 *               boardNotFound:
 *                 value:
 *                   success: false
 *                   message: Board not found
 *
 *       409:
 *         description: Conflict during concurrent updates
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Conflict detected while moving card
 *
 *       500:
 *         description: Server error (transaction failed)
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Error moving card
 */
router.put("/cards/move/:boardId/:columnId/:cardId", authMiddleware, moveCard)

module.exports = router