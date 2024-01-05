const express = require('express')
const { createUser,userLogin } = require('../controllers/userController')


const router = express.Router()

router.route('/register').post(createUser)
router.route('/login').post(userLogin)

module.exports = router