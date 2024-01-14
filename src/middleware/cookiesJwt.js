const jwt = require("jsonwebtoken")



const cookiesJwt = async(req,res,next) => {
    const jwtToken = req.cookies.token ; 
    
    try {
        const user = jwt.verify(jwtToken, process.env.JWT_SECRET) 
        req.user = user 

        next() ; 
    }catch(e) {
        
        res.status(401).json({errors : e})
    }

}

module.exports = cookiesJwt