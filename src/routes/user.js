
const express = require("express") 
const router = express.Router() 

//get all the Users  
//Crud of User 
router.get("/users" , async(req,res)=>{
    console.log("jawk Bahy")
    res.json({message : "hello"})

})
//TODO : CRUD OF THE USER 
router.get("/user/:id" , async(req,res)=>{})
router.post("/user" , async(req,res)=>{})
router.put("/user/:id" , async(req,res)=>{})
router.delete("/user/:id" , async(req,res)=>{}) 


module.exports = router