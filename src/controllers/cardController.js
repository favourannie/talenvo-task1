const Card = require("../models/cardModel")
const Column = require("../models/columnModel")
const Board = require("../models/boardModel")
const Tag = require("../models/tagModel")
const Comment = require("../models/commentModel")
const User = require("../models/userModel")

class cardController{
    async createCard (req,res,next){
        try {
            const {boardId, columnId} = req.params
            const {title, description, dueDate} = req.body
            const board = await Board.findByPk(boardId)
            if(!board || board.userId !== req.userId){
                return res.status(404).json({
                    success: false,
                    message: "Board not found"
                })
            }

            const column = await Column.findByPk(columnId)
            if(!column || column.boardId !== boardId){
                return res.status(404).json({
                    success: false,
                    message: "Column not found"
                })
            }
            const card = await Card.create({
                columnId, title, description, dueDate
            })
            res.status(201).json({
                success: true,
                message: "Card created successfully",
                data: card
            })
        } catch (error) {
          res.status(500).json({
            success: false,
            message: "Error creating card" + error.message
          })  
        }
    }

    async updateCard (req,res,next){
        try {
            const {boardId, columnId, cardId} = req.params
            const board = await Board.findByPk(boardId)
            if(!board || board.userId !== req.userId){
                return res.status(404).json({
                    success: false,
                    message: "Board not found"
                })
            }

            const column = await Column.findByPk(columnId)
            if(!column){
                return res.status(404).json({
                    success: false,
                    message: "Column not found"
                })
            }

            const card = await Card.findByPk(cardId)
            if(!card){
                return res.status(404).json({
                    success: false,
                    message: "Card not found"
                })
            }
            const updatedCard = await card.update(req.body)
            res.status(200).json({
                success: true,
                message: "Card upated successfully",
                data: updatedCard
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error updating card" + error.message
            })
        }
    }

    async deleteCard(req,res,next){
        try{
             const {boardId, columnId, cardId} = req.params
            const board = await Board.findByPk(boardId)
            if(!board || board.userId !== req.userId){
                return res.status(404).json({
                    success: false,
                    message: "Board not found"
                })
            }

            const column = await Column.findByPk(columnId)
            if(!column || column.boardId !== boardId){
                return res.status(404).json({
                    success: false,
                    message: "Column not found"
                })
            }

            const card = await Card.findByPk(cardId)
            if(!card || card.columnId !== columnId){
                return res.status(404).json({
                    success: false,
                    message: "Card not found"
                })
            }
            await card.destroy()
            res.status(200).json({
                success: true,
                message: "Card deleted successfully"
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error deleting card" + error.message
            })
        }
    }

    async addTag (req,res,next){
        try{
            const {boardId, columnId, cardId} = req.params
            const {tagId} = req.body
              const board = await Board.findByPk(boardId)
            if(!board || board.userId !== req.userId){
                return res.status(404).json({
                    success: false,
                    message: "Board not found"
                })
            }

            const card = await Card.findByPk(cardId)
            if(!card || card.columnId !== columnId){
                return res.status(404).json({
                    success: false,
                    message: "Card not found"
                })
            }
            await card.addTag(tagId)
            const updated = await card.findByPk(cardId, {
                include: [
                    { model: Tag, as: "tags",  through: { attributes: [] } },
                    {
                        model: Comment, as: "comments",
                        include: {
                        model: User, as: "author", 
                        attributes: ["id", "email", "name"]
                    },
            },
        ],
        })
        res.status(200).json({
            success: true, 
            message: "Tag added to card successfully",
            data: updated
        })
        } catch (error){
            res.status(500).json({
                success: false,
                message: "Error adding tag to card" + error.message
            })
        }
    }

    async getCardsByColumn(req,res,next) { 
        try{
             const {boardId, columnId} = req.params
            const board = await Board.findByPk(boardId)
            if(!board || board.userId !== req.userId){
                return res.status(404).json({
                    success: false,
                    message: "Board not found"
                })
            }

            const column = await Column.findByPk(columnId)
            if(!column || column.boardId !== boardId){
                return res.status(404).json({
                    success: false,
                    message: "Column not found"
                })
            }

            const card = await Card.findAll({
                where: {columnId}, include: [{ model: Tag, as: "tags", through: {attributes: []}}]            })
                res.status(200).json({
                    success: true, 
                    message: "Cards retrieved successfully",
                    data: card
                })
        } catch (error){
            res.status(500).json({
                success: false,
                message: "Error getting cards by column" + error.message
            })
        }
    }
    
    async setDueDate (req,res,next){
        try{
            
             const {boardId, columnId, cardId} = req.params
            const board = await Board.findByPk(boardId)
            if(!board || board.userId !== req.userId){
                return res.status(404).json({
                    success: false,
                    message: "Board not found"
                })
            }

            const column = await Column.findByPk(columnId)
            if(!column || column.boardId !== boardId){
                return res.status(404).json({
                    success: false,
                    message: "Column not found"
                })
            }

            const card = await Card.findByPk(cardId)
            if(!card || card.columnId !== columnId){
                return res.status(404).json({
                    success: false,
                    message: "Card not found"
                })
            }
            const updatedCard = await card.update({ dueDate })
            res.status(200).json({
                success: true,
                message: "Due date set successfully",
                data: updatedCard
            })
        } catch (error){
            res.status(500).json({
                success: false, 
                message: "Error setting due date" + error.message
            })
        }
    }
}

module.exports = new cardController