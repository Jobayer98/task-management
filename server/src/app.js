const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//internal imports
const authRoutes = require("./routes/auth.route");
const taksRoutes = require("./routes/task.route");

const app = express();

// Middlewares
app.use(express.json(), cors(), cookieParser());

// Routes
app.use("/api/v1", authRoutes);
app.use("/api/v1", taksRoutes);

module.exports = app;
