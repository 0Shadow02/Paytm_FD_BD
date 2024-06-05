import { jwt, secretkey } from "../config"

export function authmiddleware(req,res,next){
    const authheader= req.headers.Authorization

    if (!authheader || !authheader.startsWith('Bearer ')) {
        return res.status(403).json({});
        
    }
    const token = authheader.split(" ")[1]
    try {
        const decode = jwt.verify({token:token},secretkey)
        req.userId = decode.userId
        next()
    } catch (error) {
        return res.status(403).json({});
    }
    
}