const zod = require('zod')
const express= require('express')
const Schema = zod.object({
username: zod.string(),
password: zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/)
    
})

function middleware(req,res,next){
    const username = req.body.username
    const password = req.body.password
    const payload = Schema.safeParse({username,password})
    if (payload.success) {
        next()
    }
    else{
        res.send("wrong inputs")
    }
}
module.exports = {middleware}