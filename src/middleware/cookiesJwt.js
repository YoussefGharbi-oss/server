const jwt = require("jsonwebtoken")



const cookiesJwt = async(req,res,next) => {
    const jwtToken = req.cookies.token ; 
    const bearerToken = req.headers.authorization;
    console.log(bearerToken)
    console.log(jwtToken)
    try {
        const user = jwt.verify(jwtToken, process.env.JWT_SECRET) 
        req.user = user 
        next() ; 
    }catch(e) {
        
        console.log(`errors is ${e}`)
    }

}

module.exports = cookiesJwt