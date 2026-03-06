const Comment = require("../models/commentModel.js")
const Card = require("../models/cardModel.js")
const User = require("../models/userModel.js")
const Board = require("../models/boardModel.js")

class commentController {
    async createComment(req,res,next){
        try {
             const { boardId, cardId } = req.params
            const { content } = req.validatedBody
            const userId = req.userId

            const board = await Board.findByPk(boardId)
            if (!board || board.userId !== userId) {
                return res.status(404).json({ success: false, message: "Board not found" })
            }
            const card = await Card.findByPk(cardId)
            if(!card){
                return res.status(404).json({
                    success: false,
                    message: "Card not found"
                })
            }
            const comment = await Comment.create({cardId, userId, content})
            res.status(201).json({
                success: true,
                message: "Comment added to card successfully",
                data: comment
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error adding comment to card" + error.message
            })
        }
    }
}

module.exports = new commentController()