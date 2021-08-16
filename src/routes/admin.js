const express = require('express')
const multer  = require('multer')

const router = express.Router()

const adminController = require('../app/controller/AdminController')

router.get('/', adminController.index)
router.get('/users', adminController.showUsers)
router.get('/videos', adminController.showVideos)
router.get('/login', adminController.showLogin)
router.post('/login', adminController.login)

module.exports = router