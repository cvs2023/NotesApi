const express = require("express");
const { getNotes, createNote, deleteNote, updateNote } = require("../controllers/noteController");
const auth = require("../middlewares/auth");
const noteRouter = express.Router();

noteRouter.get("/", auth , getNotes)
noteRouter.post("/", auth , createNote)
noteRouter.put("/:id", auth , updateNote)
noteRouter.delete("/:id", auth , deleteNote)


noteRouter.post("/random",(req,res)=>{
    const random = Math.floor(Math.random() * data.length)
    const index = data[random]
    res.status(200).json(index);
})


module.exports = noteRouter;