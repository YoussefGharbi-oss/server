const {z} = require("zod")

const  projectDataSchema =  z.object({
    projectName:z.string().min(5,"username is Required"), 
    //TODO create a date intervalle of Date  
    finishedAt : z.string() , 
  

})


module.exports = projectDataSchema