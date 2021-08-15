const express = require('express')
const router = express.Router()

const homeController = require('../app/controller/HomeController')

router.get('/', homeController.index)
router.get('/view/:id', homeController.view)

module.exports = router