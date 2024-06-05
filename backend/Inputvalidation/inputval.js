const zod = require('zod')
const express= require('express')
const { User } = require('../DataBase/db')
const Schema = zod.object({
FirstName: zod.string(),
lastName:zod.string(),
username: zod.string().email(),
password: zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/)
    
})

async function signupmiddleware(req,res,next){
    
    const FirstName = req.body.FirstName
    const lastName = req.body.lastName
    const username = req.body.username
    const password = req.body.password
    const payload = Schema.safeParse({FirstName,lastName,username,password})
    if (payload.success) {
       const userExist = await User.findOne({username:username ,FirstName:FirstName,lastName:lastName})
      
       if (!userExist) {
        next()
       
       }
       else{
        res.send("User already exist")}
    }
    else{
        res.send("wrong inputs")
    }
}
function signinmiddleware(req,res,next){
    
    const FirstName = req.body.FirstName
    const lastName = req.body.lastName
    const username = req.body.username
    const password = req.body.password
    const payload = Schema.safeParse({FirstName,lastName,username,password})
    if (payload.success) {
      
       next()
    }
    else{
        res.send("wrong inputs")
    }
}
module.exports = {signinmiddleware,signupmiddleware}