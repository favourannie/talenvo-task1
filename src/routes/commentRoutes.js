const express = require("express")
const {createComment, getComments, editComment, deleteComment } = require("../controllers/commentController")
const{validate, createCommentSchema} = require("../validation/validation")
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router()

/**
 * @swagger
 * /comment/{boardId}/{cardId}:
 *   post:
 *     summary: Create a comment or reply on a card
 *     description: |
 *       Creates a new comment on a card.  
 *       If `parentCommentId` is provided, the comment will be treated as a reply.
 *
 *       - No parentCommentId → Top-level comment  
 *       - With parentCommentId → Reply to another comment (max 2 levels recommended)
 *
 *     tags: [Comments]
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
 *         name: cardId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the card
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: This card needs to be completed before Friday
 *
 *               parentCommentId:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *                 example: 006e176c-313e-458f-bed9-9464810056ad
 *                 description: |
 *                   Optional. If provided, the comment becomes a reply to the parent comment.
 *
 *     responses:
 *       201:
 *         description: Comment or reply created successfully
 *         content:
 *           application/json:
 *             examples:
 *               topLevel:
 *                 summary: Top-level comment
 *                 value:
 *                   success: true
 *                   message: Comment added successfully
 *                   data:
 *                     id: "b51ce34a-eca8-44d1-b479-27e7a742884c"
 *                     cardId: "3aeceafe-55a1-47c2-b29d-cf09f64878b6"
 *                     userId: "58450dae-9f22-4b88-ab91-613b2409aa4f"
 *                     content: "Card completed"
 *                     parentCommentId: null
 *
 *               reply:
 *                 summary: Reply to a comment
 *                 value:
 *                   success: true
 *                   message: Reply added successfully
 *                   data:
 *                     id: "c92e34aa-1234-4abc-9999-abcdef123456"
 *                     cardId: "3aeceafe-55a1-47c2-b29d-cf09f64878b6"
 *                     userId: "58450dae-9f22-4b88-ab91-613b2409aa4f"
 *                     content: "This is a reply"
 *                     parentCommentId: "b51ce34a-eca8-44d1-b479-27e7a742884c"
 *
 *       404:
 *         description: Board, card, or parent comment not found
 *         content:
 *           application/json:
 *             examples:
 *               boardNotFound:
 *                 value:
 *                   success: false
 *                   message: Board not found
 *
 *               cardNotFound:
 *                 value:
 *                   success: false
 *                   message: Card not found
 *
 *               parentNotFound:
 *                 value:
 *                   success: false
 *                   message: Parent comment not found
 *
 *       400:
 *         description: Invalid parent comment
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Parent comment does not belong to this card
 *
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Error adding comment
 */
router.post("/comment/:boardId/:cardId", authMiddleware, createComment)

/**
 * @swagger
 * /comment/{commentId}:
 *   put:
 *     summary: Edit a comment
 *     description: Updates the content of an existing comment.
 *     tags: ["Comments"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: ID of the comment (UUID)
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
 *               content:
 *                 type: string
 *                 example: "Updated comment text"
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Comment updated"
 *               data:
 *                 id: "b51ce34a-eca8-44d1-b479-27e7a742884c"
 *                 content: "Updated comment text"
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
router.put("/comment/:commentId", authMiddleware, editComment)

/**
 * @swagger
 * /comment/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     description: Deletes a comment by its ID.
 *     tags: ["Comments"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: ID of the comment (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Comment deleted"
 *       404:
 *         description: Comment not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Comment not found"
 *       500:
 *         description: Server error
 */
router.delete("/comment/:commentId", authMiddleware, deleteComment)

/**
 * @swagger
 * /comment/{cardId}:
 *   get:
 *     summary: Get comments for a card (with threaded replies)
 *     description: Retrieves all top-level comments for a card including nested replies (2 levels deep).
 *     tags: ["Comments"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: cardId
 *         in: path
 *         required: true
 *         description: ID of the card (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: "comment-1"
 *                   content: "Main comment"
 *                   cardId: "card-uuid"
 *                   userId: "user-uuid"
 *                   parentCommentId: null
 *                   createdAt: "2026-03-19T10:00:00.000Z"
 *                   updatedAt: "2026-03-19T10:00:00.000Z"
 *                   replies:
 *                     - id: "reply-1"
 *                       content: "First reply"
 *                       parentCommentId: "comment-1"
 *                       replies:
 *                         - id: "reply-2"
 *                           content: "Reply to reply"
 *                           parentCommentId: "reply-1"
 *       404:
 *         description: Card not found or no comments
 *       500:
 *         description: Server error
 */
router.get("/comment/:cardId", authMiddleware, getComments)

module.exports = router