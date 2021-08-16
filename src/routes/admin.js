const express = require('express')
const multer  = require('multer')

const router = express.Router()

const adminController = require('../app/controller/AdminController')

router.get('/', adminController.index)

router.get('/users', adminController.showUsers)

router.get('/videos', adminController.showVideos)
router.get('/videos/add', adminController.showAddVideo)
router.post('/videos/add', adminController.addVideo)

router.get('/edit/:videoId', adminController.showEditVideo)
router.put('/save/:videoId', adminController.saveEditVideo)

router.delete('/delete/:videoId', adminController.deleteVideoSoft)

router.get('/login', adminController.showLogin)
router.post('/login', adminController.login)

module.exports = router