const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");
const path = require("path");

//swagger
const file = fs.readFileSync(path.join(__dirname, "../swagger.yml"), "utf8");
const swaggerDocument = YAML.parse(file);

//internal imports
const authRoutes = require("./routes/auth.route");
const taksRoutes = require("./routes/task.route");

const app = express();

// Middlewares
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json(), cors(), cookieParser());

// Routes
app.use("/api/v1", authRoutes);
app.use("/api/v1", taksRoutes);

module.exports = app;
