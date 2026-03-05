const express = require("express")
const {createColumn, updateColumn, deleteColumn} = require("../controllers/columnController") 
const router = express.Router()

router.post("/", createColumn)
router.put("/:columnId", updateColumn)
router.delete("/:columnId", deleteColumn)

module.exports = router