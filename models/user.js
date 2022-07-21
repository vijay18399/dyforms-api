const Sequelize = require("sequelize");

const sequelize = require("../util/db");

const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: Sequelize.STRING,
    displayName: Sequelize.STRING,
    pin: Sequelize.STRING,
  },
  {
    timestamps: false,
  }
);

module.exports = User;
