const User = require('../models/userModel')
const Video = require('../models/videoModel')

const addVideoValidate = require('../validates/addVideoValidate')
class AuthController {
    // [GET] /admin
    index(req, res, next) {
        res.render('admin/admin')
    }

    // [GET] /admin/users
    showUsers(req, res, next) {
        User.find({})
            .then(users => res.render('admin/admin-users', { users }))
    }

    // [GET] /admin/videos
    showVideos(req, res, next) {
        Video.find({})
            .then(videos => res.render('admin/admin-videos', { videos }))
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

    // [PUT] /admin/save/:videoId
    saveEditVideo(req, res, next) {
        let values = req.body
        let title = values.title.trim()
        let description = values.description.trim()
        let videoId = values.videoId.trim()
        
        let afterEditObjectData = { title, description, videoId}
        Video.updateOne({ _id: req.params.videoId }, afterEditObjectData)
            .then(() => res.redirect('/admin/videos'))
            .catch(next)
    }

    // [DELETE] /admin/delete/:videoId
    deleteVideoSoft(req, res, next) {
        Video.deleteOne({ _id: req.params.videoId })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [GET] /admin/login
    showLogin(req, res, next) {
        res.render('admin/login')
    }

    // [POST] /admin/login
    login = async function (req, res, next) {
        res.send('<h1>Nguyen Anh Khoa</h1>')
    }

    // // [GET] /auth/log-out
    // logOut = async function (req, res, next) {
    //     res.clearCookie('userId')        
    //     res.redirect('/')
    // }
}

module.exports = new AuthController