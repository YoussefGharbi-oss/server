const express = require("express") 
const { createNewProject, getProjects, getProjectById, updateProject, deleteProject } = require("../handlers/project")
const { VerifyManager } = require("../middleware/Manager")
const router = express.Router()

router.get("/projects" , getProjects)
router.get("/project/:id" , getProjectById)
router.post("/project" , createNewProject)
router.put("/project/:id" , updateProject)
router.delete("/project/:id" , deleteProject)  



module.exports = router 