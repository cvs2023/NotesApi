const userModel = require("../schema/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY

const getUsers =async ( req,res)=>{
    res.status(200).json("message"); 
 
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
            return res.status(404).json({message:"User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const result = await userModel.create({
            userName : userName,
            email:email,
            password:hashedPassword
        })
        const token = jwt.sign({email:result.email,id:result._id},SECRET_KEY)

        res.status(200).json({user:result,token:token})
    } catch (error) {
        console.error(error);
         res.status(500).json({message:"Something went wrong "})
    }
}
const signIn  = async (req,res)=>{
    const {userName , password ,email} = req.body;

    const existingUser = await userModel.findOne({email:email});

    if(!existingUser){
        return res.send(404).json({message:"Not Found"})
    }

    const matchPassword = await bcrypt.compare(password , existingUser.password)

    if(!matchPassword){
        return res.send(400).json({message:"Invalid password"})
    }
    const token = jwt.sign({email:existingUser.email,id:existingUser._id},SECRET_KEY)
    console.log("sign In");
    res.status(201).json({user:existingUser,token:token})

}

module.exports = {signIn,signUp ,getUsers}