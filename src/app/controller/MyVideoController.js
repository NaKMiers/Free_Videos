const User = require('../models/userModel')
const Video = require('../models/videoModel')

class MyVideoController {
    // [GET] /my-videos
    index(req, res, next) {
        let user = res.locals.user
        User.find({ _id: user._id })
            .then(user => res.render('my-videos/my-videos', { user: user[0] }))
    }

    // [PUT] /my-videos/add/:videoId
    addVideo = async function(req, res, next) {
        let user = res.locals.user
        let videoData = await Video.find({ _id: req.params.videoId })
        let videoDataObject = {
            _id: videoData[0]._id,
            title: videoData[0].title,
            description: videoData[0].description,
            videoId: videoData[0].videoId,
        }
        
        let newUpdateUser = await User.find({ _id: user._id })
        newUpdateUser[0].myVideos.push(videoDataObject)

        User.updateOne({ _id: user._id }, newUpdateUser[0])
            .then(() => res.redirect('back'))
    }

    // [PUT] /my-videos/remove/:index
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