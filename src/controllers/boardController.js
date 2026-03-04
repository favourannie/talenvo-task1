const Board = require("../models/boardModel")
const Column = require("../models/columnModel")
const User = require("../models/userModel")

class boardController {
    async createBoard(req,res) { 
        try {
            const userId = req.userId
            const {title, description} = req.body
            const  board = await Board.create({
                userId, title, description
            })

            res.status(201).json({
                success: true, 
                message: "Board created successfully"
            })
        } catch (error) {
            res.status(500).json({
                success: false, 
                message: "Error creating board" + error.message
            })
        }
    }

    async getUserBoards (req,res){
        try {
            const userId = req.userId
            const boards = await Board.findAll({
                where : {userId},
                include: [
                    {model : User, as: "owner",
                        attributes: ["id", "email", "name"]
                    }
                ]
            })

            res.status(200).json({
                success: true, 
                message: "Boards retrieved successfully",
                data: boards
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error getting user boards" + error.message
            })
        }
    }

    async getBoardById(req,res) {
        try {
            const {id} = req.params
            const board = await Board.findByPk(id, {
                include: [
                    {model: User, as: "owner",
                        attributes: ["id", "email", "name"]
                    },
                    {
                        model: Column, as: "columns"
                    }
                ]
            })
            if(!board || board.userId !== req.userId) {
                return res.status(404).json({
                    success: false, 
                    message: "Board not found"
                })
            }
            res.status(200).json({
                success: true,
                message: "Board retrieved successfully",
                data: board
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error getting a board" + error.message
            })
        }
    }

    async updateBoard (req,res){
        try {
            const {id} = req.params
            const board = await Board.findByPk(id)
            if(!board || board.userId !== req.userId){
                return res.status(404).json({
                    success: false,
                    message: "Board not found"
                })
            }
            const updatedBoard = await board.update(req.body)
            res.status(200).json({
                success: true,
                message: "Board updated successfully",
                data: updatedBoard
            })
        } catch (error) {
            res.status(500),json({
                success: false, 
                message: "Error updating board" + error.message
            })
            
        }
    }

    async deleteBoard (req,res){
        try {
            const { id } = req.params
            const board = await Board.findByPk(id)
            if (!board || board.userId !== req.userId) {
                return res.status(404).json({ success: false, message: "Board not found" })
            }
            await board.destroy()
            res.status(200).json({ success: true, message: "Board deleted successfully" })
        } catch (error) {
           res.status(500).json({
            success: false, 
            message: "Error deleting board" + error.message
           })
        }
    }
}

module.exports = new boardController()