const { verifyToken } = require("../services/jwtoken")


const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.json({ message: "No token provided" })
        }

        const token = authHeader.split(" ")[1]

        if (!token) {
            return res.json({ message: "Invalid token format" })
        }

        const decoded = verifyToken(token)

        req.userId = decoded.userId

        next()

    } catch (err) {
        return res.status(500).json({
            message:'Invalid token!! Access denied try again!!'
        }) 
    }
}


module.exports = {authMiddleware}