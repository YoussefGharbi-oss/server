const express = require("express")
const user = require("./routes/user") 
const team = require("./routes/team") 
const cookieParser = require('cookie-parser');
const project = require("./routes/project") 
const dotenv = require("dotenv")
const morgan = require("morgan")
const bodyParser = require("body-parser")

const { createNewUser, signIn, signout } = require("./handlers/user.js")
const cors = require("cors");
const cookiesJwt = require("./middleware/cookiesJwt.js");
const app = express() 
const port = 5000
dotenv.config()


//Middlewears
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//you can use nested middlewears by using Npm i compose-middlewear 
//custom middlewears

app.use('/api/',cookiesJwt ,  user)
//handle user 
app.post("/user" , createNewUser) 
app.post("/signin"  ,  signIn ) 
app.post("/logout" , signout)
app.listen(port,()=> {
    console.log(`server listening on ${port}`)
})