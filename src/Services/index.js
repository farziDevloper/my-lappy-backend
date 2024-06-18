const express = require("express");

const app = express();
app.use(express.json());

const userController = require("../Controllers/user.controller");
const imageController = require("../Controllers/image.controller");

app.use("/user", userController);
app.use("/images", imageController);
module.exports = app;
