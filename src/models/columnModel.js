const { DataTypes } = require("sequelize")
const {sequelize} = require("../config/database")
const Board = require("./boardModel")
const { title } = require("process")

const Column = sequelize.define(
    "Column",
    {
        id: {
            type:DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        boardId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Board,
                key: "id"
            },
            onDelete: "CASCADE"
        },
        title: {
            type: DataTypes.STRING(255),
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
        tableName: "columns",
        timestamps: true
    }
)

Column.belongsTo(Board, {
    foreignKey: "boardId", as: "board"
})
Board.hasMany(Column, {
    foreignKey: "boardId", as: "columns"
})
module.exports = Column