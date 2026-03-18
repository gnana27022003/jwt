const express = require('express')
const { storeUserData } = require('../controllers/storeUserData')
const { verifyUserData } = require('../controllers/verifyUserData')
const { authMiddleware } = require('../middlewares/authMiddleware')
const User = require('../models/user')
const router = express.Router()


router.post('/signup',storeUserData)

router.post('/login',verifyUserData)

router.get("/dashboard", authMiddleware, async(req, res) => {
    try{
        const user = await User.findById(req.userId)
        return res.status(200).json({
            message:'Welcome User!!',
            user
        })
    }
    catch(err){
        console.log('Server error',err)
        return res.status(500).json({
            message:'Internal error'
        })
    }
})

module.exports = router
