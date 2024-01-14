const prisma = require("../db");
const projectDataSchema = require("../validationShema/projectValidate");
const jwt = require("jsonwebtoken")

const createNewProject = async (req,res) => {
    const data = req.body 

    const validate = await projectDataSchema.parseAsync(data)
    try {
        const newProject = await prisma.project.create({
            data : {
                ...validate ,
                projectManager : data.projectManager , 
                progress : data.progress

             }

         
        })
        if(!newProject) return res.status(400).json({error : "there is an error while creating the project !!! "}) 
        return res.status(200).json({newProject})
    }catch(e){
        return res.status(500).json({error : "something went Wrong !!! "})
    }
 

} 
const getProjects = async (req,res) => {
    
  

    try {
        const projects = await prisma.project.findMany({
          include : {
            manager:{
                select : {
                    email : true, 
                    username:true,
                    userId : true,
                    first_name : true , 
                    last_name : true , 
                    role : true , 
            
            
                  }
            }

          }
        })
        if(!projects)  return res.status(404).json({error : "User Not Found !! "})
        return res.status(200).json(projects);
    }catch(e) {
        res.status(500).json({error : "there is an error "})
    }
}
const getProjectById = async (req,res) => {
    const {id} = req.params 
    try {
        const project = await prisma.project.findFirst({
            where : {
                projectId : id ,
            },
            include : {
                manager : {
                    select : {
                        userId : true,
                        username:true,    
                        email : true, 
                        first_name : true , 
                        last_name : true 
                
                
                      }
                }
            }
        })
        if(!project) return res.status(404).json({errors : "project not found"})
        return res.status(200).json({project})
    }catch (e) {
        return res.status(404).json({error:" something went Wrong  "})
    }
} 
const updateProject = async(req,res) => {
    const {id}=req.params;
    //TODO Validate Data 
    const data=req.body;
    try {
        const updatedProject =await prisma.project.update({
            where : {
                projectId : id
            },
            data :  data
    })
    if(!updateProject) return res.status(400).json({error : "error while updating project !! "})
    return res.status(200).json({message : "project updated successfully"});
}catch(e) {
    return res.status(500).json({error : "something Went Wrong !!   "})
}
}
const deleteProject = async(req,res) => {
    const {id} = req.params ;
    try {
        const deletedproject = await prisma.project.delete({
            where : {
                projectId : id
            }
            
        })
        if (!deletedproject )return res.status(406).json({ error :"error while deleting the Project"}) 
        return res.status(200).json({message : "deleted project with success"})

    
}catch(e) {
    return res.status(500).json({error: 'Internal Server Error'});
}
}
module.exports = {
    createNewProject, 
    getProjects,
    getProjectById , 
    updateProject , 
    deleteProject

}