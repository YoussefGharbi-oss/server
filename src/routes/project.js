const express = require("express") 
const router = express.Router()


router.get("/projects" , async(req,res)=>{})
router.get("/project/:id" , async(req,res)=>{})
router.post("/project" , async(req,res)=>{})
router.put("/project/:id" , async(req,res)=>{})
router.delete("/project/:id" , async(req,res)=>{})  



module.exports = router 