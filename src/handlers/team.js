const prisma = require("../services/db");

const createNewTeam = async (req,res) => {
    const data = req.body 
    try{
        const createUser = await prisma.team.create({
            data : req.body
        })
        if(!createUser) return res.status(400).json({error : "error while creating new Team ! "})
        return res.status(200).json({message : "user created succesfully !!! "})

    }catch(e){
        res.status(500).json({error : e})            

    }
}
const getAllTeams = async (req,res) => {
    try {
        const teams = await prisma.team.findMany({
           include :  {
            manager: true , 
            project : true

           }
        })
        if(!teams) return res.status(400).json({error : "Can't get all teams !!"}) 
        return res.status(200).json({teams})
    }catch(e){
        res.status(500).json({error : e})
    } 
}
const getTeambyId = async (req,res) => {
    const {id} = req.params
    try {
        const team = await prisma.team.findUnique({
            where : {
                teamId : id 
            }

        })
        if(!team) return res.status(400).json({error : "Can't get the Team !!"}) 
        return res.status(200).json(team)
    }catch(e){
        res.status(500).json({error : e})

    }
}
const updateTeam = async (req,res) => {
    const {id} = req.params
    const data = req.body
   
    try {
        const updateTeam = await prisma.team.update({
            where : {
                teamId : id , 
            
          
            } , 
            data : data

        })
        if(!updateTeam) return res.status(400).json({error : "Can't get the Team !!"}) 
        return res.status(200).json(updateTeam)
    }catch(e){
        

        res.status(500).json({error : e})

    }
}
const deleteTeam = async (req,res) => {
    const {id} = req.params
    try {
        const team = await prisma.team.delete({
            where : {
                teamId : id 
            }

        })
        if(!team) return res.status(400).json({error : "Can't get the Team !!"}) 
        return res.status(200).json(team)
    }catch(e){
        res.status(500).json({error : e})

    }
}
module.exports  = {
    createNewTeam, 
    getAllTeams  , 
    getTeambyId ,
    updateTeam , 
    deleteTeam 
} 