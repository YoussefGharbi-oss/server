const prisma = require("../db") 
const { hashpassword, createJWT, comparePassword } = require("../modules/auth")
const {z} = require("zod") 
const dataSchema = require("../validationShema/userValidate")


const createNewUser = async (req, res) => {
    const ValidateData = await dataSchema.parseAsync(req.body)

    //Create a new User 
    try{
        const user = await prisma.user.create({
        
            data : ValidateData
        })
        if (!user) return res.status(400)  
    //Create a new Token 
        const token = createJWT(user)
        res.cookie("token" , token)
        res.status(200).json({ token }  )
    }catch(e) {
        console.log(e)
    }
    



}  
const signIn = async (req,res) => {
    try{

        const user = await prisma.user.findUnique({
            where: {
                username: req.body.username, 
            }
        });
        if(!user){
            return res.status(401).json({message : "jawk bahy"})
        }
       
        const isValid = await comparePassword(req.body.password , user.password)
        if(!isValid){
            res.status(401).json({message : "something went Wrong "})
        }

        const token = createJWT(user);
        res.cookie("token" , token , {
            httpOnly : true ,
        })

        return res.status(200).json({token,user});

    }catch(e){
        console.log(`error is ${e}`)
    }
   
}
const signout = async (req,res) => {
    try{
        res.clearCookie('token')  
    return res.status(200).json({message : "logout performed successfully !!! "})
    }catch(e){
        console.log(`the errror is ${e}`)
        return res.status(401).json({message: "message"})
    }
} 

module.exports =  {
    createNewUser ,
    signIn , 
    signout
}