const { DataTypes } = require("sequelize")
const {sequelize} = require("../config/database")
const Column = require("./columnModel")

const Card = sequelize.define(
    "Card",
    {
        id: {
            type:DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        columnId: {
            type: DataTypes.STRING(128),
            allowNull: false,
            references: {
                model: Column,
                key: "id"
            },
            onDelete: "CASCADE"
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: true
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
        tableName: "cards",
        timestamps: true
    }
)



Card.belongsTo(Column, { foreignKey: "columnId", as: "column" })
Column.hasMany(Card, { foreignKey: "columnId", as: "cards" })

const Tag = require("./tagModel")
Card.belongsToMany(Tag, {
    through: "card_tags",
    foreignKey: "cardId",
    otherKey: "tagId",
    as: "tags",
})
module.exports = Card 