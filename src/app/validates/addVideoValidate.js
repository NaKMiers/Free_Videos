
async function addVideoValidate(req, res, next) {
    let values = req.body

    let title = values.title.trim()
    let description = values.description.trim()
    let videoId = values.videoId.trim()
    
    let newVideoObjectData = { title, description, videoId }

    return newVideoObjectData
}

module.exports = addVideoValidate