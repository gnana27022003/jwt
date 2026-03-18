const jwt = require('jsonwebtoken')

function getToken(user){
    try{
        const payload = {
            userId:user._id
        }
        expiry = {
            expiresIn:"1h"
        }
        return jwt.sign(payload,process.env.SECRET,expiry)
    }
    catch(err){
        console.log("error creating the JWT token",err)
        return null
    }
}

function verifyToken(token){
    try{
        return jwt.verify(token,process.env.SECRET)
    }
    catch(err){
        console.log('Invalid token',err)
        return null
    }
}

module.exports = {getToken,verifyToken}