const prisma = require("../db");

const getAllusers  = async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        select : {
          email : true, 
          username:true,
          userId : true,
          first_name : true , 
          last_name : true , 
          role : true
  
  
        }
      });
      
      res.status(200).json({ users });
    } catch (e) {
      console.log("cant get all the users ", e);
      res.status(401).json({ error: "can' get all the users" });
    }
}
const getUserById =async (req, res) => {
    const { id } = req.params;
  
    try {
      const getUserById = await prisma.user.findFirst({
        where: {
          userId: id,
        },
       
      });
  
      if (!user) return res.status(400).json({ error: "User not found" });
      return res.status(200).json({ getUserById });
    } catch (e) {
      console.log("can't get the User !!!  ");
      return res
        .status(400)
        .json({ message: "there is an error while gettting this user !! " });
    }
  };
  const updateUser =  async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const updatedUser = await prisma.user.update({
        where: { userId: id },
        data: data,
      });
      if (!updatedUser) {
        res.status(400).json({ error: "can ' t update this User " });
      }
      return res.status(200).json({ updatedUser });
    } catch (e) {
      return res
        .status(400)
        .json({ error: "Error in updating the user information" });
    }
  };
  const deleteUser = async (req, res) => {
    const {id} = req.params
    try{
        const deletedUser = await prisma.user.delete({
           where : {
            userId : id
           }
        })
        if(!deletedUser) res.status(400).json({message : "can' t delete the User !! "}) 
        return  res.status(200).json({message : "user deleted successfully !! "})
    }catch(e){
        return res.status(400).json({error : "there is an error !! "}) 

    }
  
};
module.exports = {
    getAllusers , 
    getUserById ,
    updateUser,  
    deleteUser,
}