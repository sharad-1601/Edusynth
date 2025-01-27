const express = require ("express");
const app = express();
require ("dotenv").config()
app.use(express.json())
const cluster = require("cluster")
const OS = require("os")
const { authMiddleware } = require("./middlewares/auth.middleware");


app.use('/public', express.static('./public'));

const auth_router = require("./routes/auth.routes")
app.use('/auth', auth_router)

const course_router = require("./routes/course.route")
app.use('/course', authMiddleware, course_router)

const enrollment_router = require("./routes/enrollment.route")
app.use('/enroll', authMiddleware, enrollment_router)

const file_router = require("./routes/file.route");
app.use('/file', authMiddleware, file_router)

const withdraw_router = require("./routes/withdraw.route");
app.use('/withdraw', authMiddleware, withdraw_router)

if(cluster.isMaster){
  const cpus_number = OS.cpus().length
  for(let i = 0; i<cpus_number;i++){
    cluster.fork()
  }
}else{
  app.listen(process.env.PORT,(err)=>{
    if (err) console.error(err)
    console.log(`Worker ${process.pid} is up and running on port`, process.env.PORT)
    require ("./config/db.config")
  })
}