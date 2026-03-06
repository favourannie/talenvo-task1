const {verifyToken} = require("../utils/auth")

const authMiddleWare = (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                success: false,
                message: "Invalid authorization token"
            })
        }

        const token = authHeader.substring(7)
        const decoded = verifyToken(token)
        req.userId = decoded.id
        next()
    } catch(error){
        res.status(401).json({
            success: false,
            message: "Unauthorized" + error.message
        })

    }
}

module.exports = authMiddleWare