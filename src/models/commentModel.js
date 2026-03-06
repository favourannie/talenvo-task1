const { DataTypes } = require("sequelize")
const {sequelize} = require("../config/database")
const Card = require("./cardModel")
const User = require("./userModel")

const Comment = sequelize.define(
    "Comment",
    {
        id: {
            type:DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        cardId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Card,
                key: "id"
            },
            onDelete: "CASCADE"
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references : {
                model: User, 
                key: "id"
            },
            onDelete: "CASCADE"
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        tableName: "comments",
        timestamps: true
    }
)

module.exports = Comment