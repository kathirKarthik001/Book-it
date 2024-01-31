const asyncHandler = require('express-async-handler')

// @desc Register new User
// @route  POST /api/users
// @access Public
const RegisterUser = asyncHandler (async (req, res) =>{
    res.status(201)
    res.json({
        message:'register User'
    })
})

// @desc Login as User
// @route  POST /api/users/login
// @access Public
const LoginUser = asyncHandler (async (req, res) =>{
    res.status(200)
    res.json({
        message:'login User'
    })
})

// @desc Get User info
// @route  GET /api/users/me
// @access Private
const GetME = asyncHandler (async (req, res) =>{
    res.status(200)
    res.json({
        message:'login User'
    })
})



module.exports = { RegisterUser , LoginUser ,GetME }