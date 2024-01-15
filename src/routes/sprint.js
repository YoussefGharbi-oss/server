const express = require("express") 
const { getAllsprints, getsprintbyId, createNewsprint, updateSprint, deleteSprint } = require("../handlers/sprint")
const { VerifyManager } = require("../middleware/Manager")

const router = express.Router() 



router.get("/sprints"  , getAllsprints )
router.get("/sprint/:id" , getsprintbyId)


router.use(VerifyManager)

router.post("/sprint" , createNewsprint)
router.put("/sprint/:id" , updateSprint)
router.delete("/sprint/:id" , deleteSprint)  




module.exports = router 