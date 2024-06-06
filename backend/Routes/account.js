const Router = require('express')
const router = Router()
const { User, Account} = require("../DataBase/db");
const { authmiddleware } = require('../authmiddleware/middleware.');
const { jwt, secretkey } = require('../config');
const { default: mongoose } = require('mongoose');


router.get('/balance',authmiddleware,async (req,res)=>{
    const auth = req.headers.authorization
    const token= auth.split(" ")[1]
    const decode = jwt.verify(token,secretkey)
    const account = await Account.findOne({userId:decode.userId})
    res.json({balance:account.balance})
})

router.post('/transfer',authmiddleware,async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction()
    const {amount,totransfer}= req.body
    const account = await Account.findOne({userId:req.userId}).session(session)

    if (account.balance<amount) {
        await session.abortTransaction()
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }
    const toaccount= await User.findOne({username:totransfer}).session(session)
   
    if (!toaccount) {
        await session.abortTransaction()
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({userId:req.userId},{$inc:{balance: -amount}}).session(session)
    await Account.updateOne({userId:toaccount._id},{$inc:{balance:  amount}}).session(session)

    await session.commitTransaction();
    res.status(200).json({
         message: "Transfer successful"
     })


})

// router.post('/transfer',authmiddleware,async(req,res)=>{
//     const auth = req.headers.authorization
//     const amount = req.body.amount
//     const token= auth.split(" ")[1]
//     const decode = jwt.verify(token,secretkey)
//     const fromtransfer= decode.userId
   
//     const user2= req.body.username
    
//     const user2id= await User.findOne({username:user2})
   
//     if (!user2id) {
//         res.status(400).json({
//             message: "Invalid account"
//         })
//     }
//     else{
//     const totransfer= user2id._id
//     const acc= await Account.findOne({userId:fromtransfer})
//     const userbalance= acc.balance
//     console.log("user1 bal: "+userbalance)
//     if (userbalance<amount) {
//         res.status(400).send({
//             message: "Insufficient balance"
//         })
//     }
//     else{
//     await Account.updateOne({userId:fromtransfer}, { $inc:{balance:-amount}})
    
//     await Account.updateOne({userId:totransfer},{$inc:{balance:amount}})
//     res.status(200).json({
//         message: "Transfer successful"
//     })
//     }
//     }
// })













// accrouter.get("/account",async(req,res,next)=>{

//     const user= await  User.find({})
//     const account= await Account.findOne({userId:"66601563b1d99f3325db01be"})
  
// //    user.map(async(users)=>{
// //     const account= await Account.findOne({userId:users._id})
// //     res.json({
// //         FirstName:users.FirstName,
// //         userId:users._id,
// //         // balance: account.balance
// //     })
   
    
// //    })

// res.json(account)
// })


module.exports = router;