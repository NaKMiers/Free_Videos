const Video = require('../models/videoModel')

const videoPagination = require('../../util/video-pagination')
class HomeController {
    // [GET] /
    index = async function(req, res, next) {
        let videos = await Video.find({})

        let [ videoAfterSlice, pagination, totalPage, curPage ] = videoPagination(req, res, next, videos, 8, 5)

        res.render('home', {
            // videos: videos.slice(start, end),
            videos: videoAfterSlice,
            pagination,
            totalPage,
            curPage
        })
    }

    // [GET] /view/:slug
    view(req, res, next) {
        Video.findOne({ slug: req.params.slug })
            .then(video => res.render('view', { video }))
    }
}

module.exports = new HomeController