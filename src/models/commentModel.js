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

Comment.belongsTo(Card, { foreignKey: "cardId", as: "card" })
Card.hasMany(Comment, { foreignKey: "cardId", as: "comments" })
Comment.belongsTo(User, { foreignKey: "userId", as: "author" })
User.hasMany(Comment, { foreignKey: "userId", as: "comments" })

module.exports = Comment