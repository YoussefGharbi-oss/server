const express = require("express") 
const { createNewUser, signIn, signout, refreshAccess } = require("../../handlers/auth.user")
const router = express.Router()




router.post("/signup" , createNewUser) 
router.post("/signin"  ,  signIn) 
router.post("/logout" , signout)
router.post("/refresh"  ,refreshAccess)



module.exports = router
