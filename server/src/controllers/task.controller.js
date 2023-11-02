const taskModel = require("../models/task.model");

// create task
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

// get all tasks
const getTasks = async (req, res, next) => {
  try {
    const { status, limit, page, sortBy, search } = req.query;
    let tasks, totalTasks;
    const match = {};
    const sort = {};
    const skip = (parseInt(page) - 1) * parseInt(limit);

    if (search) {
      tasks = await taskModel
        .find({
          user: req.user._id,
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        })
        .limit(parseInt(limit))
        .skip(skip);
    } else {
      if (status) {
        match.status = status;
        totalTasks = await taskModel.countDocuments({
          user: req.user._id,
          status,
        });
      } else {
        totalTasks = await taskModel.countDocuments({
          user: req.user._id,
        });
      }

      if (sortBy) {
        sort.createdAt = sortBy === "asc" ? 1 : -1;
      }
      await req.user.populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(limit),
          skip,
          sort,
        },
      });
      tasks = req.user.tasks;
    }

    if (!tasks.length) {
      return res.status(404).json({
        success: false,
        message: "No tasks found",
      });
    }

    res.status(200).json({
      success: true,
      totalTasks,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get a single task
const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await taskModel.findOne({ _id: id, user: req.user._id });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
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

// update task
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await taskModel.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { title, description, status },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
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
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await taskModel.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
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
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
