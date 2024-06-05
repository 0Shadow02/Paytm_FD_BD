const { Router } = require("express");
const { User } = require("../DataBase/db");
const { signupmiddleware, signinmiddleware } = require("../Inputvalidation/inputval");
const { jwt, secretkey } = require("../config");
const router = Router()




router.post("/signup",signupmiddleware,async (req,res)=>{

    const FirstName = req.body.FirstName
    const lastName = req.body.lastName
    const username = req.body.username
    const password = req.body.password
    
try {
const user = await new User({FirstName,lastName,username,password})
user.save()
const token = jwt.sign({username:username}, secretkey)

res.status(200).json("user created successfully"+" " +" userId:" +token)
} catch (error) {
    res.status(401).json(error)
}
})

router.post("/signin",signinmiddleware,async (req,res)=>{
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

module.exports = router;