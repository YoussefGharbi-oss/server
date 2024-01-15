const express = require("express")
const cors = require("cors");
const cookieParser = require('cookie-parser');
const morgan = require("morgan")
const cookiesJwt = require("./middleware/cookiesJwt.js");


const auth = require("./routes/auth/auth.js")
const user = require("./routes/user") 
const project = require("./routes/project.js")
const team = require("./routes/team.js")
const sprint = require("./routes/sprint.js")

const dotenv = require("dotenv")
const bodyParser = require("body-parser");
const { VerifyManager } = require("./middleware/Manager.js");
const logger = require("./modules/logger.js");
const { logMiddlware } = require("./middleware/logsMiddleware.js");
const app = express() 
const port = 5000


//dotenv config
dotenv.config()
//log config 


//Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(logMiddlware)
app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).send();
  });
//handle user authentification ! 
app.use("/auth/" , auth)

//you can use nested middlewears by using Npm i compose-middlewear 
//custom middlewears
app.use('/api/',cookiesJwt, VerifyManager ,  user)
app.use('/api/',VerifyManager, project )
app.use('/api/' , cookiesJwt , team  )
app.use('/api/' , cookiesJwt , sprint)





app.listen(port,()=> {
    console.log(`server listening on ${port}`)
})