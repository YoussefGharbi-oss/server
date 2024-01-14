const express = require("express");
const { getAllusers, getUserById, updateUser, deleteUser } = require("../handlers/user");
const router = express.Router();

//get all the Users
//Crud of User

router.get("/users",getAllusers )

router.get("/user/:id", getUserById)
router.put("/user/:id", updateUser)
router.delete("/user/:id", deleteUser)

module.exports = router;
