const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://0amatsu0:TXTwmq7DvDnfPnIR@cluster0.dtsvekg.mongodb.net/paytm")
const MySchema = mongoose.Schema({
  FirstName:String,
  lastName:String,
  username: String,
  password : String
})
const User = mongoose.model('user',MySchema)
module.exports = {User}


