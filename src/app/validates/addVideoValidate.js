const Video = require('../models/videoModel')

async function addVideoValidate(req, res, next) {
    let values = req.body

    let title = values.title.trim()
    let description = values.description.trim()
    let videoId = values.videoId.trim()

    let videoMatchVideoId = await Video.find({ videoId: values.videoId })
    let videoMatchTitle = await Video.find({ title: values.title })

    if (videoMatchVideoId.length > 0 || videoMatchTitle.length > 0) {
        res.render('admin/add-video', {
            isDuplicateVideo: 'Video is exist, please add the other video.',
            values
        })
        return
    }
    
    let errors = []

    title == '' ? errors.push('❌Empty title, please enter title.❌') : errors.push('')
    description == '' ? errors.push('❌Empty description, please enter description.❌') : errors.push('')
    videoId == '' ? errors.push('❌Empty video ID, please enter video ID.❌') : errors.push('')

    if (errors.join() !== ',,') {
        res.render('admin/add-video', { errors })
    } else {
        return { title, description, videoId }
    }
}

module.exports = addVideoValidate