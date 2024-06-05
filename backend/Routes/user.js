const { Router } = require("express");
const { User } = require("../DataBase/db");
const { signupmiddleware, signinmiddleware, updatemiddleware } = require("../Inputvalidation/inputval");
const { jwt, secretkey } = require("../config");
const { authmiddleware } = require("../authmiddleware/middleware.");
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

res.status(200).json({
	message: "User created successfully",
	token: token
})
} catch (error) {
    res.status(411).json(error)
}
})

router.post("/signin",signinmiddleware,async (req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const token = jwt.sign({username:username}, secretkey)
    try {
       const check = await User.findOne({username,password})
       if (check) {
        res.status(200).json(
            {
                token: "jwt"
            })
       }
        else{ res.send(
            {
                message: "Error while logging in"
            })}
        } catch (error) {
            res.status(411).json(error)
        }
        

})

router.put("/update",updatemiddleware,authmiddleware,async(req,res)=>{
try {
    await User.updateOne(req.body,{
    _id:req.userId
})
res.json({
    message: "Updated successfully"
})
} catch (error) {
    res.json(error)
}


})

module.exports = router;