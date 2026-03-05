const express = require("express")
const {createCard, updateCard, setDueDate, addTag, getCardsByColumn, deleteCard } = require("../controllers/cardController") 
const router = express.Router()

router.post("/", createCard)
router.get("/", getCardsByColumn)
router.put("/:cardId", updateCard)
router.post("/:cardId", setDueDate)
router.post("/:cardId/tags", addTag)
router.delete("/:cardId", deleteCard)

module.exports = router