const express = require('express')
const router = express.Router()

const { RegisterUser , LoginUser ,GetME } = require('../controller/userController')


router.route('/').post(RegisterUser)

router.route('/login').post(LoginUser)

router.route('/me').get(GetME)


module.exports = router