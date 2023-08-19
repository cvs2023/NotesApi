const express = require("express");
const app = express();
const notesRoute = require("./routes/notesRoutes");
const users = require("./routes/usersRoutes");
const dotenv = require("dotenv");
const cors = require("cors");

const PORT = process.env.PORT || 6000

dotenv.config();

const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
app.use("/notes", notesRoute)
app.use("/users", users)    

mongoose.connect( process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(()=>{
    app.listen(PORT,()=>{
        console.log("Server started at port no : " + PORT );
    })
})
.catch((error)=>{
    console.error(error);
})
