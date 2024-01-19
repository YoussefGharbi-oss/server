const jwt = require("jsonwebtoken") 
const bcrypt = require("bcrypt")

const  createJWT = (user , expAt , secret) => {
    const token = jwt.sign({
          
        username : user.username , 
        role : user.role 
}, secret , {expiresIn : expAt})
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
