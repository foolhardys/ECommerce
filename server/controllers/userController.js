const ErrorHandler = require('../utils/errorHandler')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const sendToken = require('../utils/jwtToken')

const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const tempUser = {
            name,
            email,
            password: hashedPassword,
            avatar: {
                public_id: "Sample id",
                url: "Sample url"
            }
        }
        const user = await User.create({ ...tempUser })

        sendToken(user, 201, res)
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body

        // Checking for email and password
        if (!email || !password) {
            return next(new ErrorHandler("Please enter email password", 400))
        }

        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return next(new ErrorHandler("Invalid email or password", 401))
        }


        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return next(new ErrorHandler("Invalid email or password", 401))
        }

        sendToken(user, 200, res)
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

module.exports = {
    createUser,
    userLogin
}