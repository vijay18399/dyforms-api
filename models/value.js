const Sequelize = require("sequelize");

const sequelize = require("../util/db");

const Value = sequelize.define(
  "value",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    value: Sequelize.STRING(100),
  },
  {
    timestamps: false,
  }
);

module.exports = Value;
