const bcrypt = require("bcrypt")
const { generateToken} = require("../utils/auth")
const User = require("../models/userModel")

class authController {
    async register(req,res,next) {
        try {
            const {email, password, name} = req.body
            if(!email || !password){
                return res.status(400).json({
                    success: false,
                    message: "Email and password are required"
                })
            }
            const existingUser = await User.findOne({where: {email}})
            if(existingUser){
                return res.status(400).json({
                    success: false, 
                    message: "Email already exists"
                })
            }
            const hashed = await bcrypt.hash(password, 10)
            const user = await User.create({email, password: hashed, name})
            const token = generateToken(user.id)

            res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: {
                    user,
                    token
                }
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error creating a user"+ error.message
            })
        }
    }

    async login(req,res,next) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({where : {email}})
            if(!user) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials"
                })
            }
            const valid = await bcrypt.compare(password, user.password)
            if(!valid){
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials"
                })
            }

            const token = generateToken(user.id)
            res.status(200).json({
                success: true,
                message: "Login successful",
                data: {
                    user,
                    token
                }
            })
        } catch (error) {
            res.status(500),json({
                success: false,
                message: "Error logging in" + error.message
            })
        }
    }
}

module.exports = new authController()