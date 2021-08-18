const express = require('express')
const multer  = require('multer')

const router = express.Router()
const upload = multer({ dest: 'src/public/uploads/' })

const myVideoController = require('../app/controller/UserController')

router.get('/profile', myVideoController.showProfile)
router.put('/profile/save', upload.single('avatar'), myVideoController.saveProfile)
router.get('/my-videos', myVideoController.showMyVideo)
router.get('/my-videos/view/:slug', myVideoController.view)
router.get('/my-videos/add/:videoId', myVideoController.addVideo)
router.get('/my-videos/remove/:index', myVideoController.removeVideo)

module.exports = router