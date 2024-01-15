const express = require("express") 
const { createNewTeam, getTeambyId, getAllTeams, updateTeam, deleteTeam } = require("../handlers/team")
const router = express.Router() 



router.get("/teams" ,getAllTeams )
router.get("/team/:id" , getTeambyId)
router.post("/team" , createNewTeam)
router.put("/team/:id" , updateTeam)
router.delete("/team/:id" , deleteTeam)  




module.exports = router 