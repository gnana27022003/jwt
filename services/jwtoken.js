const jwt = require('jsonwebtoken')

function getToken(user){//this function is for generating the jsonwebtokens whenever the user is logged in
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

function verifyToken(token){//this function is used to verify the token whenever the user wants to access the routes
    try{
        return jwt.verify(token,process.env.SECRET)
    }
    catch(err){
        console.log('Invalid token',err)
        return null
    }
}

module.exports = {getToken,verifyToken}