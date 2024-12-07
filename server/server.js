const express = require("express");
var logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const authenticateRouter = require("./routes/authenticate");
const tasksRouter = require("./routes/tasks");

const app = express();

app.use(cookieParser());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:4200", // Frontend domain
    credentials: true, // Allow sending cookies
  })
);

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
