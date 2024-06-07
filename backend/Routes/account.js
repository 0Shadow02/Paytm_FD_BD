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

// Good Method using (uses txns in db)
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
    const toaccount= await User.findOne({_id:totransfer}).session(session)
   
    if (!toaccount) {
        await session.abortTransaction()
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({userId:req.userId},{$inc:{balance: -amount}}).session(session)
    await Account.updateOne({userId:totransfer},{$inc:{balance:  amount}}).session(session)

    await session.commitTransaction();
    res.status(200).json({
         message: "Transfer successful"
     })


})


//  Bad method:
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




module.exports = router;