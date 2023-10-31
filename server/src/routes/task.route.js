const { createTask } = require("../controllers/task.controller");
const isLoggedIn = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post("/create-task", isLoggedIn, createTask);

module.exports = router;
