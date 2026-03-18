const User = require('../models/user')
const bcrypt = require('bcryptjs')
const storeUserData = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success:true,
                message:"Please enter all the fields name,email,password"
            })
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists!!"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({
            name,
            email,
            password:hashedPassword
        })
        return res.status(200).json({
            success:true,
            message:"User Registered Successfully"
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:'Internal sever error'
        })
    }
}

module.exports = {storeUserData}