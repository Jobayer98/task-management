const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");
const isLoggedIn = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post("/task", isLoggedIn, createTask);
router.get("/tasks", isLoggedIn, getTasks);
router
  .route("/tasks/:id")
  .get(isLoggedIn, getTask)
  .patch(isLoggedIn, updateTask)
  .delete(isLoggedIn, deleteTask);

module.exports = router;
