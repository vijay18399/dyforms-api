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
    text: Sequelize.STRING,
    data_type: Sequelize.STRING,
    field_options: Sequelize.STRING(100),
  },
  {
    timestamps: false,
  }
);

module.exports = Field;
