const express = require("express")
const cors = require("cors");
const cookieParser = require('cookie-parser');
const morgan = require("morgan")
const cookiesJwt = require("./middleware/cookiesJwt.js");



const auth = require("./routes/auth/auth.js")
const user = require("./routes/user") 
const project = require("./routes/project.js")
const dotenv = require("dotenv")
const bodyParser = require("body-parser");
const { VerifyManager } = require("./middleware/Manager.js");
const app = express() 
const port = 5000

//dotenv config
dotenv.config()


//Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//handle user authentification ! 
app.use("/auth/" , auth)
//you can use nested middlewears by using Npm i compose-middlewear 
//custom middlewears
app.use('/api/',cookiesJwt, VerifyManager ,  user)
app.use('/api/',VerifyManager, project )








app.listen(port,()=> {
    console.log(`server listening on ${port}`)
})