const zod = require('zod')
const express= require('express')
const { User } = require('../DataBase/db')
const Schema = zod.object({
FirstName: zod.string(),
lastName:zod.string(),
username: zod.string().email(),
password: zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/)
    
})
const signinSchema = zod.object({
username: zod.string().email(),
password: zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/)
    
})
const updateSchema = zod.object({
FirstName: zod.string().optional(),
lastName:zod.string().optional(),
password: zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/).optional()
    
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
        res.send({
            message: "Email already taken "
        })}
    }
    else{
        res.send("Incorrect inputs")
    }
}
function signinmiddleware(req,res,next){
    
   
    const username = req.body.username
    const password = req.body.password
    const payload = signinSchema.safeParse({username,password})
    if (payload.success) {
      
       next()
    }
    else{
        res.send("Incorrect inputs")
    }
}
function updatemiddleware(req,res,next){
    const check = updateSchema.safeParse(req.body)
    if(!check.success){
        res.status(411).json({
            message: "Error while updating information"
        })
    
    }
else{
        next()    
        }}
module.exports = {signinmiddleware,signupmiddleware,updatemiddleware}