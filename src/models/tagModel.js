const { DataTypes } = require("sequelize")
const {sequelize} = require("../config/database")

const Tag = sequelize.define(
    "Tag",
    {
        id: {
            type:DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        color: {
            type: DataTypes.STRING(7), // For hex color codes like #FF0000
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
        tableName: "tags",
        timestamps: true
    }
)

module.exports = Tag