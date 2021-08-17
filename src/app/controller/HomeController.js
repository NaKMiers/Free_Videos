const Video = require('../models/videoModel')
class HomeController {
    // [GET] /
    index(req, res, next) {
        Video.find({})
            .then(videos => res.render('home', { videos }))
    }

    // [GET] /view/:slug
    view(req, res, next) {
        Video.findOne({ slug: req.params.slug })
            .then(video => res.render('view', { video }))
    }
}

module.exports = new HomeController