const Sequelize = require("sequelize");

const sequelize = require("../util/db");

const Response = sequelize.define("response", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  from: Sequelize.STRING,
});

module.exports = Response;
