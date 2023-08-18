const express = require("express");
const notesRoute = express.Router();


notesRoute.get("/",(req,res)=>{
    res.send("res ms dhjg");
})
notesRoute.get("/data",(req,res)=>{
    res.status(200).json(data);
})
notesRoute.get("/random",(req,res)=>{
    const random = Math.floor(Math.random() * data.length)
    const index = data[random]
    res.status(200).json(index);
})


module.exports = notesRoute;