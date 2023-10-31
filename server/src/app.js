const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Middlewares
app.use(express.json(), cors(), cookieParser());

module.exports = app;
