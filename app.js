var express = require("express");
const sequelize = require("./util/db");
var formRouter = require("./routes/form.routes");

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

sequelize
  //.sync({ force: true })
  .sync()
  .then((result) => {
    console.log("Tables created");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port);
