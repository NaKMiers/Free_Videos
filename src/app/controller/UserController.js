const User = require('../models/userModel')
const Video = require('../models/videoModel')

const md5 = require('md5')
const fs = require('fs')

const videoPagination = require('../../util/video-pagination')

class MyVideoController {
    // [GET] /user/profile
    showProfile(req, res, next) {
        let user = res.locals.user
        User.find({})
            .then(users => {
                res.render('user/my-profile', { users, user })
            })
    } 

    // [PUT] /user/profile/save
    saveProfile = async function(req, res, next) {
        let user = res.locals.user
        let values = req.body

        let oldPassword = user.password
        let password = values.password == '' ? oldPassword : md5(values.password)
        
        if (req.file) {
            // delete old avatar
            let oldAvatar = user.avatar.split('\\')[1]
            if (oldAvatar) {
                fs.unlink('src/public/uploads/' + oldAvatar, function (err) {
                    if (err) console.log(err)
                })
            }
            
            var avatar = '/' + req.file.path.split('\\').splice(2).join('\\')
        } else {
            var avatar = '/'
        }

        let userDataObject = {
            name: values.name.trim(),
            username: values.username.trim(),
            email: values.email.trim(),
            password,
            avatar
        }

        User.updateOne({ _id: user._id }, userDataObject)
            .then(() => res.redirect('back'))
    }

    // -----------------------------------------------------------------------------

    // [GET] /user/my-videos
    showMyVideo = async function(req, res, next) {
        let user = res.locals.user
        let thisUser = await User.find({ _id: user._id })

        let [ videoAfterSlice, pagination, totalPage, curPage ] = videoPagination(req, res, next, thisUser[0].myVideos, 8, 5)
        
        res.render('user/my-videos', {
            videos: videoAfterSlice,
            pagination,
            totalPage,
            curPage
        })
    }

    // [GET] /user/my-videos/view/:slug
    view(req, res, next) {
        let user = res.locals.user
        let myVideos = user.myVideos
        let video = myVideos.find(video => video.slug == req.params.slug)
        
        res.render('user/my-view', { video })
    }

    // [PUT] /user/my-videos/add/:videoId
    addVideo = async function(req, res, next) {
        let user = res.locals.user
        let videoData = await Video.find({ _id: req.params.videoId })
        let videoDataObject = {
            _id: videoData[0]._id,
            title: videoData[0].title,
            description: videoData[0].description,
            videoId: videoData[0].videoId,
            slug: videoData[0].slug,
        }
        
        let newUpdateUser = await User.find({ _id: user._id })
        newUpdateUser[0].myVideos.push(videoDataObject)

        User.updateOne({ _id: user._id }, newUpdateUser[0])
            .then(() => res.redirect('back'))
    }

    // [PUT] /user/my-videos/remove/:index
    removeVideo = async function(req, res, next) {
        let user = res.locals.user
        let index = req.params.index

        let userData = await User.find({ _id: user._id })
        userData[0].myVideos.splice(index, 1)

        User.updateOne({ _id: user._id }, userData[0])
            .then(() => res.redirect('back'))
    }
}

module.exports = new MyVideoController