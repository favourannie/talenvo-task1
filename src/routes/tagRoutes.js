const express = require("express")
const {createTag } = require("../controllers/tagController")
const {validate, createTagSchema} = require("../validation/validation")
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router()

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Create a new tag
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - color
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tag name
 *               color:
 *                 type: string
 *                 description: Tag color (hex code)
 *     responses:
 *       201:
 *         description: Tag created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/tags", authMiddleware, validate(createTagSchema), createTag)

module.exports = router