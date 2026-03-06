const express = require("express")
const {createComment } = require("../controllers/commentController")
const{validate, createCommentSchema} = require("../validation/validation")
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router()

/**
 * @swagger
 * /comment/{boardId}/{cardId}:
 *   post:
 *     summary: Add a comment to a card
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "This card needs to be completed before Friday"
 *     responses:
 *       201:
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Comment added to card successfully
 *               data:
 *                 id: "comment123"
 *                 content: "This card needs to be completed before Friday"
 *       404:
 *         description: Board or card not found
 *       500:
 *         description: Server error
 */
router.post("/comment/:boardId/:cardId", authMiddleware, validate(createCommentSchema), createComment)

module.exports = router