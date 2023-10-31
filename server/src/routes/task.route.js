const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");
const isLoggedIn = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post("/create-task", isLoggedIn, createTask);
router.get("/get-tasks", isLoggedIn, getTasks);
router
  .route("/get-tasks/:id")
  .get(isLoggedIn, getTask)
  .patch(isLoggedIn, updateTask)
  .delete(isLoggedIn, deleteTask);

module.exports = router;
