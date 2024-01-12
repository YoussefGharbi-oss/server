const jwt = require("jsonwebtoken") 
const bcrypt = require("bcrypt")

const  createJWT = (user) => {
    const token = jwt.sign({
        id:user.userID ,  
        username : user.username , 
}, process.env.JWT_SECRET)
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
