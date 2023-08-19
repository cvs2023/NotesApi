const express = require("express");
const users = express.Router();

const { signIn, signUp ,getUsers } = require("../controllers/userController");

users.get("/",getUsers)
users.post("/signin",signIn)
users.post("/signup",signUp)

module.exports = users;