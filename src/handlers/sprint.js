const prisma = require("../services/db");

const createNewsprint = async (req,res) => {
     const data = req.body 
     try{
        const newSprint = await prisma.sprint.create({data: data});
        if(!newSprint) return res.statu(400).json({error : 'couldn t create the sprint  '}) 
        return res.status(200).json({message : "sprint created Succesfully !! "} )


     }catch(e){
        return res.status(500).json({errors : e})

     }
    
}
const getAllsprints = async (req,res) => {
    try{
        const sprints = await prisma.sprint.findMany({
            include : {
                project : true ,
            }
        })
        if(!sprints) return res.status(400).json({error : "can ' t get all sprints "}) 
        return res.status(200).json({sprints})
    }
    catch(e){
        return res.status(500).json({errors : e})

    }

}
const getsprintbyId = async(req,res) => {
    const {id} = req.params 
    try{
        const sprint = await prisma.sprint.findFirst({
            where : {
                sprintId : id 
            }
        })
        if(!sprint) return res.status(404).json({error : "sprint  not found "})
        return res.status(200).json({sprint})
    }catch(e){

    }
}
const updateSprint = async (req,res) => {
    const {id} = req.params 
    const data = req.body 
    try {
        const sprint = await prisma.sprint.update({
            where : {
                sprintId : id , 
            },
            data : data 
        })
        if(!sprint) return res.status(400).json({error : "can ' t update the sprint "})
        return res.status(200).json({message : "the sprint has been updated " })
    }catch(e){
        return res.status(500).json({ errors: e })
    }

} 
const deleteSprint = async (req,res) => {
    const {id} = req.params 
    try {
        const sprint = await prisma.sprint.delete({
            where : {
                sprintId : id , 
            },
        })
        if(!sprint) return res.status(400).json({error : "can ' t delete the sprint "})
        return res.status(200).json({message : "the sprint has been deleted " })
    }catch(e){
        return res.status(500).json({ errors: e })
    }
}
module.exports = {
    createNewsprint, 
    getAllsprints, 
    getsprintbyId, 
    updateSprint, 
    deleteSprint
}