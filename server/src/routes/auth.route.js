const router = require("express").Router();

const { signup, login, logout } = require("../controllers/auth.controller");
const isLoggedIn = require("../middlewares/auth.middleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", isLoggedIn, logout);

module.exports = router;
