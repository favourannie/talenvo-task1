const Tag = require("../models/tagModel")

class tagController {
    async createTag(req,res,next) {
        try{
            const{name} = req.body
            const existingTag = await Tag.findOne({
                where: {name}
            })
            if(existing) {
                return res.status(409).json({
                    success: false,
                    message: "Tag already exists"
                })
            }
            const tag = await Tag.create({name})
            res.status(200).json({
                success: true,
                message: "Tag created successfully",
                data: tag
            })
        } catch{
            res.status(500).json({
                success: false,
                message: "Error creating tag" + erro.message
            })
        }
    }
}

module.exports = new tagController