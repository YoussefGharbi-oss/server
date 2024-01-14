const express = require("express") 
const { createNewUser, signIn, signout } = require("../../handlers/auth.user")
const router = express.Router()




router.post("/signup" , createNewUser) 
router.post("/signin"  ,  signIn) 
router.post("/logout" , signout)




module.exports = router
