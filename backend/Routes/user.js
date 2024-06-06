const { Router } = require("express");
const { User, Account } = require("../DataBase/db");
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
const account= await new Account({userId:user._id,balance: 1+ Math.random()*10000})
account.save()
const userId = user._id
const token = jwt.sign({userId}, secretkey)

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
    
       const user = await User.findOne({username,password})
    
        
       if (user) {
        const token = jwt.sign({userId: user._id}, secretkey)
        res.status(200).json(
            {
                token: token
            })
       }
        else{ res.send(
            {
                message: "Error while logging in"
            })}
        
        

})

router.put("/update",updatemiddleware,authmiddleware,async(req,res)=>{
    
try {
    await User.updateOne({
        
    _id:req.userId
},req.body)
res.json({
    message: "Updated successfully"
})
} catch (error) {
    res.json(error)
}


})





router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            FirstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            
            firstName: user.FirstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
module.exports = router;
