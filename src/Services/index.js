const express = require("express");

const app = express();
app.use(express.json());

const userController = require("../Controllers/user.controller");

app.use("/user", userController);

module.exports = app;
