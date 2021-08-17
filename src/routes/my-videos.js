const express = require('express')
const router = express.Router()

const myVideoController = require('../app/controller/MyVideoController')

router.get('/', myVideoController.index)
router.get('/view/:slug', myVideoController.view)
router.get('/add/:videoId', myVideoController.addVideo)
router.get('/remove/:index', myVideoController.removeVideo)

module.exports = router