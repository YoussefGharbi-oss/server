const prisma = require("../services/db");
const { project } = require("../services/db");
const jwt = require("jsonwebtoken")


const VerifyManager = async (req,res,next ) => {
   
    try{
        token = req.headers['authorization'].split(' ')[1]
        
        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
        const user = await prisma.user.findUnique({
            where : {
                username : decodedToken.username
            }})
            if(user.role !== 'isManager' ) return res.status(401).json({erros : "not authorized"}) 

    }catch(e){
     return res.status(500).json({errors : e})

    }
   
        next()
}
module.exports = {
    VerifyManager
}