const Tag = require("../models/tagModel")

class tagController {
    async createTag(req,res,next) {
        try{
            const{name} = req.body
            const existingTag = await Tag.findOne({
                where: {name}
            })
            if(existingTag) {
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
        } catch(error){
            res.status(500).json({
                success: false,
                message: "Error creating tag" + error.message
            })
        }
    }
}

module.exports = new tagController