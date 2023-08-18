const express = require("express");
const { signIn, signUp ,getUsers } = require("../controllers/userController");
const users = express.Router();

users.get("/",getUsers)
users.post("/signin",signIn)
users.post("/signup",signUp)

module.exports = users;