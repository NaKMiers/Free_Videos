const express = require('express')
const multer  = require('multer')

const router = express.Router()
const upload = multer({ dest: 'src/public/uploads/' })

const authController = require('../app/controller/AuthController')

router.get('/login', authController.showLogin)
router.post('/login', authController.login)
router.get('/log-out', authController.logOut)
router.get('/registry', authController.showRegistry)
router.post('/registry', upload.single('avatar'), authController.registry)

module.exports = router