var express = require("express");
const sequelize = require("./util/db");
var formRouter = require("./routes/form.routes");

const Form = require("./models/form");
const Field = require("./models/field");
const Value = require("./models/value");
const Response = require("./models/response");
var app = express();
var port = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", formRouter);
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

Form.hasMany(Field, { as: "fields" });
Form.hasMany(Response, { as: "responses" });
Response.hasMany(Value, { as: "values" });
Field.hasMany(Value);
Value.belongsTo(Field, { as: "field" });
sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    console.log("Tables created");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port);
