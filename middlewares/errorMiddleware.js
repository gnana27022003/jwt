const errorMiddleware = async(err,req,res,next)=>{
    if(err){
        
        res.json({
            "success": false,
            "message": "Invalid token"
        })
    }
    else{
        next()
    }
}

module.exports = {errorMiddleware}