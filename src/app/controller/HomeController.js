const Video = require('../models/videoModel')
class HomeController {
    // [GET] /
    index(req, res, next) {
        Video.find({})
            .then(videos => res.render('home', { videos }))
    }

    // [GET] /view/:id
    view(req, res, next) {
        Video.findOne({ _id: req.params.id })
            .then(video => res.render('view', { video }))
    }
}

module.exports = new HomeController