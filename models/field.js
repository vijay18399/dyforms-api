const Sequelize = require("sequelize");

const sequelize = require("../util/db");

const Field = sequelize.define(
  "field",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    label: Sequelize.STRING,
    data_type: Sequelize.STRING,
  },
  {
    timestamps: false,
  }
);

module.exports = Field;
