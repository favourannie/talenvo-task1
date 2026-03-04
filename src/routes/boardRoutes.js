const express = require("express")
const {createBoard, updateBoard, getBoardById, deleteBoard, getUserBoards } = require("../controllers/boardController") 
const router = express.Router()

router.post("/", createBoard)
router.get("/", getUserBoards)
router.get("/:id", getBoardById)
router.put("/:id", updateBoard)
router.delete("/:id", deleteBoard)

module.exports = router