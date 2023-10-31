const taskModel = require("../models/task.model");

const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Please provide title",
      });
    }

    const task = await taskModel.create({
      title,
      description,
      status,
      user: req.user._id,
    });

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
};
