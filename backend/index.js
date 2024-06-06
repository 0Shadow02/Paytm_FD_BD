const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rootRouter = require('./Routes/index')

const app = express()
app.use(cors());
 
app.use(express.json())
app.use("/api/v1", rootRouter);


app.listen(3000,()=>{
    console.log("listening to port 3000")
})

