const fs = require('fs')

const User = require('../models/userModel')
const Video = require('../models/videoModel')

const addVideoValidate = require('../validates/addVideoValidate')
class AuthController {
    // [GET] /admin
    index(req, res, next) {
        res.render('admin/admin')
    }

    // --------------------------------------------------------------------------------

    // [GET] /admin/users
    showUsers(req, res, next) {
        let usersQuery = User.find({})
        if (req.query.hasOwnProperty('_sort')) {
            usersQuery = usersQuery.sort({
                [req.query.column]: req.query.type
            })
        }
        usersQuery
            .then(users => res.render('admin/admin-users', { users }))
    }

    // [DELETE] /admin/users/delete/:userId/force
    deleteUserForce = async function(req, res, next) {
        let user = await User.find({ _id: req.params.userId})
        let oldAvatar = user[0].avatar.split('\\')[1]

        User.deleteOne({ _id: req.params.userId })
            .then(() => {
                fs.unlink('src/public/uploads/' + oldAvatar, function (err) {
                    if (err) console.log(err)
                })
                res.redirect('back')
            })
            .catch(next)
    }

    // [POST] /admin/users/handle-form-action
    handleFormActionUser(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                let userIds = req.body.userIds
                userIds.forEach(async function(userId) {
                    let user = await User.find({ _id: userId })
                    let oldAvatar = user[0].avatar.split('\\')[1]

                    User.deleteOne({ _id: userId })
                        .then(() => {
                            fs.unlink('src/public/uploads/' + oldAvatar, function (err) {
                                if (err) console.log(err)
                            })
                        })
                        .catch(next)
                })
                res.redirect('back')
                break
            default:
                res.send('<h1 style="color: #f44335 text-align: center">Action is invalid</h1>')                
        }
    }

    // --------------------------------------------------------------------------------
    
    // [GET] /admin/videos
    showVideos(req, res, next) {
        let videosQuery = Video.find({})
        if (req.query.hasOwnProperty('_sort')) {
            videosQuery = videosQuery.sort({
                [req.query.column]: req.query.type
            })
        }

        Promise.all([videosQuery, Video.countDocumentsDeleted()])
            .then(([videos, deletedCount]) => res.render('admin/admin-videos', { videos, deletedCount }))
            .catch(next)
    }

    // [GET] /admin/videos/add
    showAddVideo(req, res, next) {
        res.render('admin/add-video')
    }

    // [POST] /admin/videos/add
    addVideo = async function(req, res, next) {
        let newVideoObjectData = await addVideoValidate(req, res, next)

        const newVideo = new Video(newVideoObjectData)
        newVideo.save()
            .then(() => res.redirect('/admin/videos'))
    }

    // [GET] /admin/edit/:videoId
    showEditVideo = async function(req, res, next) {
        let videos = await Video.find({})
        let video = await Video.find({ _id: req.params.videoId })

        let indexEdit
        videos.find((video, i) => {
            indexEdit = i
            return video._id == req.params.videoId
        })

        res.render('admin/admin-videos', { video: video[0], videos, indexEdit })
    }

    // [DELETE] /admin/delete/:videoId
    deleteVideoSoft(req, res, next) {
        Video.delete({ _id: req.params.videoId })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] /admin/delete/:videoId/force
    deleteVideoForce(req, res, next) {
        Video.deleteOne({ _id: req.params.videoId })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [GET] /admin/trash-videos
    showTrashVideos(req, res, next) {
        Video.findDeleted({})
            .then(videos => res.render('admin/admin-trash-videos', { videos }))
            .catch(next)
    }

    // [PATCH] /admin/trash-videos/:videoId
    restoreVideo(req, res, next) {
        Video.restore({ _id: req.params.videoId })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [POST] /admin/videos/handle-form-action
    handleFormActionVideo(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Video.delete({ _id: { $in: req.body.videoIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            case 'save':
                let values = req.body
                let title = values.title.trim()
                let description = values.description.trim()
                let videoId = values.videoId.trim()
                
                let afterEditObjectData = { title, description, videoId}

                Video.updateOne({ _id: values.idEdit }, afterEditObjectData)
                    .then(() => res.redirect('/admin/videos'))
                    .catch(next)
                break
            default:
                res.send('<h1 style="color: #f44335 text-align: center">Action is invalid</h1>')                
        }
    }

    // [POST] /admin/videos/handle-form-action-trash
    handleFormActionTrashVideo(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                Video.restore({ _id: { $in: req.body.videoIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            case 'delete':
                Video.deleteMany({ _id: { $in: req.body.videoIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            default:
                res.send('<h1 style="color: #f44335 text-align: center">Action is invalid</h1>')                
        }
    }

    // [GET] /admin/login
    showLogin(req, res, next) {
        res.render('admin/login')
    }

    // [POST] /admin/login
    login = async function (req, res, next) {
        let values = req.body
        let errors = []
        
        if (values.adminUsername !== process.env.ADMIN_USERNAME) {
            errors.push('Admin username is not exist.')
            errors.push('')
            res.render('admin/login', { errors, values })
        } else if(values.adminPassword !== process.env.ADMIN_PASSWORD) {
            errors.push('')
            errors.push('Wrong password, please re-enter.')
            res.render('admin/login', { errors, values })
        } else {
            res.cookie('adminAuthorize', true, {
                signed: true,
            })
            res.redirect('/admin')
        }
    }
}

module.exports = new AuthController