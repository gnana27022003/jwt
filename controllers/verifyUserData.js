const User = require('../models/user')
const bcrypt = require('bcryptjs');
const {  getToken } = require('../services/jwtoken');

const verifyUserData = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'Please enter email and password'
            })
        }
        const user = await User.findOne({email})
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:'Invalid credentials!!'
            })
        }
        const token = getToken(user)
        if(!token){
            return res.status(400).json({
                success:false,
                message:'Error creating the JWT token please try again!!'
            })
        }
        return res.status(200).json({
            success:true,
            message:'Login successful',
            token
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'Server error'
        })
    }
}

module.exports = {verifyUserData}