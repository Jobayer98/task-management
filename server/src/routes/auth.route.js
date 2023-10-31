const router = require("express").Router();

const { signup, login, logout } = require("../controllers/auth.controller");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
