const userModel = require("../schema/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "NOTESAPI"
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

const getUsers =async ( req,res)=>{
    res.status(200).json("message"); 
    // try {
    //     await client.connect();
    //     const database = client.db('test'); 
    //     const usersCollection = database.collection('users');

    //     const users = await usersCollection.find({}).toArray(); 
    //     res.status(200).json(users); 
    // } catch (error) {
    //     console.log(error);
    // }
}
const signUp  = async (req,res)=>{
    //existing user
    //hashed password
    //user  creation
    //token generation

    const { userName , email  ,password } = req.body;
    try {
        const existingUser = await userModel.findOne({email:email});

        if(existingUser){
            return res.send(404).json({message:"User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10);//this fun runs 10 time then hash store kregain hm

        const result = await userModel.create({
            userName : userName,
            email:email,
            password:hashedPassword
        })
        //paload mai user ko validate krne ka info rhega,hmko aga need pdegi
        const token = jwt.sign({email:result.email,id:result._id},SECRET_KEY)

        return res.status(201).json({user:result,token:token})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Something went wrong "})
    }
}
const signIn  = async (req,res)=>{
    const {userName , password ,email} = req.body;

    const existingUser = await userModel.findOne({email:email});

    if(!existingUser){
        return res.send(404).json({message:"Not Found"})
    }

    const matchPassword = await bcrypt.compare(password , existingUser.password)//body and exisiting wala

    if(!matchPassword){
        return res.send(400).json({message:"Invalid password"})
    }
    //new token ?
    const token = jwt.sign({email:existingUser.email,id:existingUser._id},SECRET_KEY)
    console.log("sign In");
    return res.status(201).json({user:existingUser,token:token})

}

module.exports = {signIn,signUp ,getUsers}