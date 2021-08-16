const User = require('../models/userModel')
const Video = require('../models/videoModel')

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