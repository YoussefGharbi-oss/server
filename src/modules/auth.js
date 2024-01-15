const jwt = require("jsonwebtoken") 
const bcrypt = require("bcrypt")

const  createJWT = (user) => {
    const token = jwt.sign({
          
        username : user.username , 
        role : user.role 
}, process.env.JWT_SECRET , {expiresIn : "7h"})
  return token
}
 

const comparePassword =  async(password , hash) => {
  return bcrypt.compare(password , hash) 
}

const hashpassword = async (password) => {
  return bcrypt.hashSync(password,3)
}


module.exports = {
  createJWT , 
  hashpassword , 
  comparePassword
}
