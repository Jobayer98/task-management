const { createTask, getTasks } = require("../controllers/task.controller");
const isLoggedIn = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post("/create-task", isLoggedIn, createTask);
router.get("/get-tasks", isLoggedIn, getTasks);

module.exports = router;
