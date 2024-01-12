const express = require("express") 
const router = express.Router() 



router.get("/teams" , async(req,res)=>{res.json({message : "team mreegl "})})
router.get("/team/:id" , async(req,res)=>{})
router.post("/team" , async(req,res)=>{})
router.put("/team/:id" , async(req,res)=>{})
router.delete("/team/:id" , async(req,res)=>{})  




module.exports = router 