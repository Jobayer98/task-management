const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//internal imports
const authRoutes = require("./routes/auth.route");

const app = express();

// Middlewares
app.use(express.json(), cors(), cookieParser());

// Routes
app.use("/api/v1", authRoutes);

module.exports = app;
