const express = require('express')
const router = express.Router()
const { signupUser, signinUser } = require('../controllers/user')

router.route('/signin').post(signinUser)
router.route('/signup').post(signupUser)










module.exports = router


