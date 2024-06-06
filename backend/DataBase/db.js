const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://0amatsu0:TXTwmq7DvDnfPnIR@cluster0.dtsvekg.mongodb.net/paytm")
const MySchema = mongoose.Schema({
  FirstName:String,
  lastName:String,
  username: String,
  password : String
})
const User = mongoose.model('user',MySchema)
const accountSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
},
  balance: {
    type:Number,
    required:true,
    default: 0,
  }
})
const Account = mongoose.model("Account",accountSchema)
module.exports = {User,Account}


