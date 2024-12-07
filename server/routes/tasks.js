const express = require("express");
const router = express.Router();
const {
  addTask,
  updateTask,
  deleteTask,
  getTasks,
} = require("../controller/tasks");
const { authenticateToken } = require("../middleware/authenticate-token");

router.post("/task", authenticateToken, addTask);

router.put("/task/:id", authenticateToken, updateTask);

router.delete("/task/:id", authenticateToken, deleteTask);

router.get("/tasks", authenticateToken, getTasks);

module.exports = router;
