const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI"

//simple function,secutory gaurd  , now we can use this auth 
const auth = (req , res , next )=>{
    try {
        let token = req.headers.authorization;//req mai token aya k nhi dekho

        if( token ){
            token =  token.split(" ")[1]; 
            const user = jwt.verify(token , SECRET_KEY)//this methd hlp to decrypt this token , then we wll get user data
            //user info mai hme kya store kraya tha ? signup time see 
            req.userId  = user.id;//hmne okay hone pr user se id nikal kr req mai daal di new key userId
            //now we can use this id in next()

        }else{
            res.status(404).json({message:"unauthorized user"})
        }
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({message:"unauthorized user"})

    }
}