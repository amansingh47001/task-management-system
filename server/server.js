const express = require("express");
var logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const authenticateRouter = require("./routes/authenticate");
const tasksRouter = require("./routes/tasks");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("Database Connected!"))
  .catch((err) => console.log(err));

app.use("/api", authenticateRouter);
app.use("/api", tasksRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, (req, res) => {
  console.log(`Listening on port ${process.env.PORT}`);
});
