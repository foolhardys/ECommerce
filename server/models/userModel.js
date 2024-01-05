const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide name'],
            maxlength: [30, 'Name cannot exceed 30 characters'],
            minlength: [3, 'Name should at least contain 3 letters']
        },
        email: {
            type: String,
            required: [true, "Please provide email"],
            unique: true,
            validate: [validator.isEmail, 'Provide a valid email']
        },
        password: {
            type: String,
            required: [true, "Please provide password"],
            minlength: [8, 'Name should at least contain 8 characters'],
            select: false
        },
        avatar: {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        },
        role: {
            type: String,
            default: "user"
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date
    }
)

// JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_TOKEN, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// Compare Password
// userSchema.methods.comparePassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
//   };
  

module.exports = mongoose.model("User", userSchema)