const jwt = require("jsonwebtoken");

const cookiesJwt = async(req,res,next) => {
    
    const headers = req.headers['authorization'] ; 
    const token = headers.split(' ')[1]
   
    if(!token) return res.status(401).json({errors : "no token provided "})
// sourcery skip: use-braces
     
    
    
    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) 
        req.user = user 

        next() ; 
    }catch(e) {
        
        res.status(401).json({errors : e})
    }

}

module.exports = cookiesJwt