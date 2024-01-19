const prisma = require("../services/db");
const { hashpassword, createJWT, comparePassword } = require("../modules/auth");
const { z } = require("zod");
const dataSchema = require("../validationShema/userValidate");
const jwt = require("jsonwebtoken");
const path = require("path");

const createNewUser = async (req, res) => {
  const ValidateData = await dataSchema.parseAsync(req.body);

  //Create a new User
  try {
    const user = await prisma.user.create({
      data: {
        ...ValidateData,

        password: await hashpassword(ValidateData.password),
      },
    });
    if (!user) return res.status(400);
    //Create a new Token

    return res.status(200).json({ message: "user created Succesfully !!! " });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
const signIn = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      return res
        .status(401)
        .json({ message: "there is error with the user !!! " });
    }

    const isValid = await comparePassword(req.body.password, user.password);
    if (!isValid) {
      res.status(401).json({ message: "Password invalid !!  " });
      return 
    }

    const AccessToken = createJWT(user , "1h" , process.env.ACCESS_TOKEN_SECRET); 
    const RefreshToken = createJWT(user , "24h" , process.env.REFRESH_TOKEN_SECRET) 
    
    
    return res.cookie("Refreshtoken" , RefreshToken , {
      httpOnly : true , 
      secure : true , 
      
    }).status(200).json({ AccessToken: AccessToken , RefreshToken : RefreshToken  , user : user })


 
  } catch (e) {
    res.status(401).json({ errors: e });
  }
};
const signout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "logout successfully !!! " });
  } catch (e) {
    return res.status(401).json({ error: e });
  }
};
const refreshAccess = async (req,res) => {
  try{
    const  {Refreshtoken} = req.cookies;
    if (!Refreshtoken) {
      return res.status(401).json({ error: "No token provided" });
    }
    const decodedToken = jwt.verify(Refreshtoken , process.env.REFRESH_TOKEN_SECRET )
    if(!decodedToken) return res.status(400).json({error : "Bad Request !!! "}) 
    const AccessToken = createJWT(decodedToken , "10s" , process.env.ACCESS_TOKEN_SECRET) 
    return res.status(200).json({AccessToken : AccessToken})
  
  
  }catch(e) {
    console.error(e);
    return res.status(401).json({error : e})
  }
}
module.exports = {
  createNewUser,
  signIn,
  signout,
  refreshAccess
};
