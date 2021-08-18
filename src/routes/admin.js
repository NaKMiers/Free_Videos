const express = require('express')
const multer  = require('multer')

const router = express.Router()

const adminController = require('../app/controller/AdminController')
const adminMiddleware = require('../app/middlewares/AdminMiddleware')

// admin home page
router.get('/', adminMiddleware.requireAdminAuth, adminController.index)

// USERS
// admin manage users
router.get('/users', adminMiddleware.requireAdminAuth, adminController.showUsers)
// delete force users
router.delete('/users/delete/:userId/force' , adminMiddleware.requireAdminAuth, adminController.deleteUserForce)
// users handle form action
router.post('/users/handle-form-action' , adminMiddleware.requireAdminAuth, adminController.handleFormActionUser)

// VIDEOS
// admin manage videos
router.get('/videos', adminMiddleware.requireAdminAuth, adminController.showVideos)
// add video
router.get('/videos/add', adminMiddleware.requireAdminAuth, adminController.showAddVideo)
router.post('/videos/add', adminMiddleware.requireAdminAuth, adminController.addVideo)
// edit video
router.get('/videos/edit/:videoId', adminMiddleware.requireAdminAuth, adminController.showEditVideo)
// soft delete video
router.delete('/videos/delete/:videoId', adminMiddleware.requireAdminAuth, adminController.deleteVideoSoft)

// trash videos
router.get('/trash-videos', adminMiddleware.requireAdminAuth, adminController.showTrashVideos)
// force delete
router.delete('/trash-videos/delete/:videoId/force', adminMiddleware.requireAdminAuth, adminController.deleteVideoForce)
// restore video form trash
router.patch('/trash-videos/restore/:videoId', adminMiddleware.requireAdminAuth, adminController.restoreVideo)
// videos handle-form-action
router.post('/videos/handle-form-action', adminMiddleware.requireAdminAuth, adminController.handleFormActionVideo)
// videos handle-form-action-trash
router.post('/videos/handle-form-action-trash', adminMiddleware.requireAdminAuth, adminController.handleFormActionTrashVideo)

// admin login
router.get('/login', adminController.showLogin)
router.post('/login', adminController.login)

module.exports = router