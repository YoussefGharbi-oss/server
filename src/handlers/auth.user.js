const prisma = require("../services/db") 
const {  hashpassword,createJWT, comparePassword } = require("../modules/auth")
const {z} = require("zod") 
const dataSchema = require("../validationShema/userValidate")


const createNewUser = async (req, res) => {
    const ValidateData = await dataSchema.parseAsync(req.body)

    //Create a new User 
    try{
        const user = await prisma.user.create({
        
            data : {
                ...ValidateData , 
                
                password:await hashpassword(ValidateData.password),
            }
        })
        if (!user) return res.status(400)  
    //Create a new Token 
        const token = createJWT(user)
        res.cookie("token" , token)
        res.status(200).json({message : "user created Succesfully !!! "}  )
    }catch(e) {
        res.status(500).json({error : e})
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
            return res.status(401).json({message : "there is error with the user !!! "})
        }
       
        const isValid = await comparePassword(req.body.password , user.password)
        if(!isValid){
            res.status(401).json({message : "Password invalid !!  "})
        }

        const token = createJWT(user);
        res.cookie("token" , token , {
            httpOnly : true ,
        })

        return res.status(200).json({user});

    }catch(e){
        res.status(401).json({errors :e})
    }
   
}
const signout = async (req,res) => {
    try{
        res.clearCookie('token')  
    return res.status(200).json({message : "logout successfully !!! "})
    }catch(e){
        return res.status(401).json({error : e})
    }
} 

module.exports =  {
    createNewUser ,
    signIn , 
    signout
}