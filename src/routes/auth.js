const express = require('express')
const router = express.Router()

const authController = require('../app/controller/AuthController')

router.get('/login', authController.showLogin)
router.post('/login', authController.login)
router.get('/log-out', authController.logOut)
router.get('/registry', authController.showRegistry)
router.post('/registry', authController.registry)

module.exports = router