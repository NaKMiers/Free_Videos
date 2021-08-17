const express = require('express')
const multer  = require('multer')

const router = express.Router()

const adminController = require('../app/controller/AdminController')
const adminMiddleware = require('../app/middlewares/AdminMiddleware')

// admin home page
router.get('/', adminMiddleware.requireAdminAuth, adminController.index)

// admin manage users
router.get('/users', adminMiddleware.requireAdminAuth, adminController.showUsers)

// VIDEOs
// admin manage videos
router.get('/videos', adminMiddleware.requireAdminAuth, adminController.showVideos)
// add video
router.get('/videos/add', adminMiddleware.requireAdminAuth, adminController.showAddVideo)
router.post('/videos/add', adminMiddleware.requireAdminAuth, adminController.addVideo)
// edit video
router.get('/edit/:videoId', adminMiddleware.requireAdminAuth, adminController.showEditVideo)
// soft delete video
router.delete('/delete/:videoId', adminMiddleware.requireAdminAuth, adminController.deleteVideoSoft)

// trash videos
router.get('/trash-videos', adminMiddleware.requireAdminAuth, adminController.showTrashVideos)
// force delete
router.delete('/trash-videos/delete/:videoId/force', adminMiddleware.requireAdminAuth, adminController.deleteVideoForce)
// restore video from trash
router.patch('/trash-videos/restore/:videoId', adminMiddleware.requireAdminAuth, adminController.restoreVideo)
// videos handle-form-action
router.post('/videos/handle-form-action', adminMiddleware.requireAdminAuth, adminController.handleFormAction)
// videos handle-form-action-trash
router.post('/videos/handle-form-action-trash', adminMiddleware.requireAdminAuth, adminController.handleFormActionTrash)

// admin login
router.get('/login', adminController.showLogin)
router.post('/login', adminController.login)

module.exports = router