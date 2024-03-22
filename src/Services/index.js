const express = require("express");

const app = express();
app.use(express.json());

const userController = require("../Controllers/user.controller");
const tokenController = require("../Controllers/token.controller");

app.use("/user", userController);
app.use("/token", tokenController);
console.log("Welcome to the API!", 1);

module.exports = app;
