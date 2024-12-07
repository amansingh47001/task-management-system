const Task = require("../model/task-schema");

module.exports.addTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const taskExist = await Task.findOne({title});

    if(taskExist){
      return res.status(400).json({ message: "Task already exists" });
    }

    const task = new Task({
      title,
      description,
      status,
      user: req.user.userId,
    });

    const savedTask = await task.save();

    return res
      .status(200)
      .json({ data: savedTask, message: "Task added successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const taskExist = await Task.findOne({title});

    if(taskExist && taskExist._id.toString() !== id){
      return res.status(400).json({ message: "Task with same title already exists" });
    }
    
    if(taskExist){
      return res.status(400).json({ message: "Task already exists" });
    }

    await Task.findByIdAndUpdate(
      id,
      { $set: { title, description, status } },
      { new: true }
    );

    return res.status(200).json({ message: "Task updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(200).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find(
      { user: req.user.userId },
      { user: 0, __v: 0 }
    );

    return res
      .status(200)
      .json({ data: tasks || [], message: "Tasks fetched successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
