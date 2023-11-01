const taskModel = require("../models/task.model");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const seed = async (userId) => {
  const tasks = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../../tasks.json"), "utf-8")
  );
  tasks.forEach((task) => {
    task.user = userId;
  });
  mongoose.connection.dropCollection("tasks");
  await taskModel.insertMany(tasks);
};

module.exports = seed;
