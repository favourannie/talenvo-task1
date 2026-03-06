const { Sequelize } = require("sequelize")
const dotenv = require("dotenv")
dotenv.config()

const sequelize = new Sequelize(
    process.env.DB_NAME || "talennvo_task1",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "Funglo_1212.",
    {
        host: process.env.DB_HOST || "localhost",
        dialect : "mysql",
        logging: false,
        pool : {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
)

module.exports = { sequelize }