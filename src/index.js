const express = require("express");
const app = express();
const data = require("./dummyData");
const notesRoute = require("./routes/notesRoutes");
const users = require("./routes/usersRoutes");

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:1hjwHTmgIf3cmmJK@cluster0.1vevs3w.mongodb.net/")
.then(()=>{
    app.listen(5000,()=>{
        console.log("server started")
    })
})
.catch((er  )=>{
    console.log(er);
} )

app.use(express.json());

app.use("/notes", notesRoute)
app.use("/users", users)

