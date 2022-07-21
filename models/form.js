const Sequelize = require("sequelize");
const sequelize = require("../util/db");
const Form = sequelize.define("form", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
});

module.exports = Form;
