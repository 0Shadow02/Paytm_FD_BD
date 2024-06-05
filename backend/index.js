const express = require("express");
const app = express()
const bodyParser = require("body-parser");
const router = require("./Routes/user");
const cors = require("cors");

app.use(cors());
 
app.use(express.json())
app.use('/api/v1/user',router)

app.listen(3000,()=>{
    console.log("listening to port 3000")
})

