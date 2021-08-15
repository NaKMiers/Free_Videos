const express = require('express')
const router = express.Router()

const authController = require('../app/controller/AuthController')

router.get('/login', authController.index)
router.post('/login', authController.login)

module.exports = router