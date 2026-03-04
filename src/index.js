const express = require("express")
const dotenv = require("dotenv")
const { sequelize } = require("./config/database")

const userRoutes = require("./routes/userRoutes")
const boardRoutes = require("./routes/boardRoutes")


dotenv.config()

const app = express()
const PORT = process.env.PORT || 1976

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/health", (req,res)=>{
    res.status(200).json({
        success: true,
        message: "Server is running"
    })
})

app.use("/api/v1", userRoutes)
app.use("/api/v1", boardRoutes)
app.use((req,res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
})


async function startServer() {
    try {
        await sequelize.authenticate()
        console.log("Database connected successfully")
        await sequelize.sync({ alter: true})
        console.log("Database synced successfully")

        app.listen(PORT, ()=>{
            console.log(`Server running on Port: ${PORT}`)
        })
    } catch (error) {
        console.error("Failed to start server". error.message)
        process.exit(1)
        
    }
}

startServer()

module.exports = app