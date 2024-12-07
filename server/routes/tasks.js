const express = require("express");
const router = express.Router();
const {
  addTask,
  updateTask,
  deleteTask,
  getTasks,
  updateTaskStatus
} = require("../controller/tasks");
const { authenticateToken } = require("../middleware/authenticate-token");

router.post("/task", authenticateToken, addTask);

router.put("/task/:id", authenticateToken, updateTask);

router.patch("/task/:id", authenticateToken, updateTaskStatus);

router.delete("/task/:id", authenticateToken, deleteTask);

router.get("/tasks", authenticateToken, getTasks);

module.exports = router;
