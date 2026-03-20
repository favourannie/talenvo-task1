const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Column = require("./columnModel");

const Card = sequelize.define(
  "Card",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    columnId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Column,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "cards",
    timestamps: true,

    indexes: [
      { fields: ["columnId"] },
      { fields: ["position"] },
      { fields: ["columnId", "position"] }
    ],
  }
);

module.exports = Card;