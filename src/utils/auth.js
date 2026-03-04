const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET || "secret"
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h"

exports.generateToken = (userId) =>{
    return jwt.sign({id: userId}, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
    })
}

exports.verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET)
}