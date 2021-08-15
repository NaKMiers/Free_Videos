const Video = require('../models/videoModel')

class HomeController {
    // [GET] /
    index(req, res, next) {
        Video.find({})
            .then(videos => res.render('home', { videos }))
    }
}

module.exports = new HomeController