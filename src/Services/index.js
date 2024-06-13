const express = require("express");

const app = express();
app.use(express.json());

const userController = require("../Controllers/user.controller");
const imageController = require("../Controllers/images.controller");
const file = require("../Controllers/fileUpload.controller");

app.use("/user", userController);
app.use("/upload", imageController);
app.use("/file", file);

module.exports = app;
