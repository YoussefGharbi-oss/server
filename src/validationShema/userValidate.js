const {z} = require("zod")

const  dataSchema =  z.object({
    username:z.string().min(5,"username is Required"), 
    email : z.string().email("not a valid email") , 
    password : z.string().min(8, "password must be at least 8 characters ") , 
    first_name : z.string().min(5, "first name not valid") , 
    last_name : z.string().min(5, "role not valid") , 
    role : z.string().min(5, "role not valid")
})


module.exports = dataSchema