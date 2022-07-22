const Sequelize = require("sequelize");

const sequelize = require("../util/db");

const ValueOption = sequelize.define(
  "valueOption",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    value: Sequelize.STRING,
  },
  {
    timestamps: false,
  }
);

module.exports = ValueOption;
