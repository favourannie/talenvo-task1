const express = require("express")
const dotenv = require("dotenv")
const { sequelize } = require("./config/database")
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const http = require("http")
const { Server } = require("socket.io")
const morgan = require("morgan")

const userRoutes = require("./routes/userRoutes")
const boardRoutes = require("./routes/boardRoutes")
const cardRoutes = require("./routes/cardRoutes")
const columnRoutes = require("./routes/columnRoutes")
const tagRoutes = require("./routes/tagRoutes")
const commentRoutes = require("./routes/commentRoutes")

const {globalErrorHandler} = require("./utils/errorHandler")

dotenv.config()

require("./models/associations")

const app = express()
const PORT = process.env.PORT || 1976

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'API documentation for the Task Management application',
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api/v1`,
        description: 'Development server',
      },
      {
        url: 'https://talenvo-task1.onrender.com/api/v1',
        description: 'Production Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan("dev"))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health", (req,res)=>{
    res.status(200).json({
        success: true,
        message: "Server is running"
    })
})

app.use("/api/v1", userRoutes)
app.use("/api/v1", boardRoutes)
app.use("/api/v1", cardRoutes)
app.use("/api/v1", commentRoutes)
app.use("/api/v1", columnRoutes)
app.use("/api/v1", tagRoutes)

app.use((req,res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
})

app.use(globalErrorHandler)

async function startServer() {
    try {
        await sequelize.authenticate()
        console.log("Database connected successfully")

        await sequelize.sync()
        console.log("Database synced successfully")

        // 🔥 SOCKET.IO SETUP
        const server = http.createServer(app)

        const io = new Server(server, {
          cors: {
            origin: "*"
          }
        })

        app.set("io", io)

        server.listen(PORT, ()=>{
            console.log(`Server running on Port: ${PORT}`)
        })

    } catch (error) {
        console.error("Failed to start server " + error.message)
        process.exit(1)
    }
}

startServer()

module.exports = app