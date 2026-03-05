const Column = require("../models/columnModel")
const Card = require("../models/cardModel")
const Board = require("../models/boardModel")
const User = require("../models/userModel")

class columnController {
    async createColumn (req,res,next) {
        try {
            const {boardId} = req.params
            const {title} = req.body
            const board = await Board.findByPk(boardId)
            if(!board || board.userId !== userId){
                return res.status(404).json({
                    success:false,
                    message: "Board not found"
                })
            }
            const column = await Column.create({
                boardId, title
            })
            res.status(201).json({
                success: true,
                message: "Column created successfully",
                data: column
            })
        } catch {
            res.status(500).json({
                success: false,
                message: "Error creating column" + error.message
            })
        }
    }

    async updateColumn(req,res,next){
        try{
            const {boardId, columnId} = req.params
             const board = await Board.findByPk(boardId)
            if (!board || board.userId !== req.userId) {
                return res.status(404).json({ success: false, message: "Board not found" })
            }

            const column = await Column.findByPk(columnId)
            if (!column || column.boardId !== boardId) {
                return res.status(404).json({ success: false, message: "Column not found" })
            }
            const updatedColumn = await column.update(req.body)

            res.status(200).json({
                success: true,
                message: "Column updated successfully",
                data: updatedColumn
        })
        } catch{
            res.status(500).json({
                success: false,
                message: "Error updating column" + error.message
            })
        }
    }

    async deleteColumn(req,res,next){
        try{
            const {boardId, columnId} = req.params
           const board = await Board.findByPk(boardId)
            if (!board || board.userId !== req.userId) {
                return res.status(404).json({ success: false, message: "Board not found" })
            }

            const column = await Column.findByPk(columnId)
            if (!column || column.boardId !== boardId) {
                return res.status(404).json({ success: false, message: "Column not found" })
            }  
            await column.destroy()
            res.status(200).json({
                success: true,
                message: "Column deleted successfully"
            })
        } catch{
            res.status(500).json({
                success: false,
                message: "Error deleting column" + error.message
            })
        }
    }
}

module.exports = new columnController