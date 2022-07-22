const Sequelize = require("sequelize");

const sequelize = require("../util/db");

const FieldOption = sequelize.define(
  "fieldOption",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    label: Sequelize.STRING,
  },
  {
    timestamps: false,
  }
);

module.exports = FieldOption;
