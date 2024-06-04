const { Router } = require("express");
const { User } = require("../DataBase/db");
const { middleware } = require("../Inputvalidation/inputval");
const router = Router()




router.post("/signup",middleware,async (req,res)=>{
    const username = req.body.username
    const password = req.body.password
    
try {
const user = await new User({username,password})
user.save()
res.status(200).json("user created successfully")
} catch (error) {
    res.status(401).json("there some error")
}
})

router.post("/signin",middleware,async (req,res)=>{
    const username = req.body.username
    const password = req.body.password
    
    try {
       const check = await User.findOne({username,password})
       if (check) {
        res.status(200).json("signin successfully")
       }
        else{ res.send("User does not exist")}
        } catch (error) {
            res.status(401).json("there some error")
        }
        

})

router.post("/update",()=>{

})