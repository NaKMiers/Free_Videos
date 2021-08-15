const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VideoSchema = new Schema({
    title: String,
    description: String,
    videoId: String,
}, {
    timestamp: true
})

const Video = mongoose.model('Video', VideoSchema, 'videos')
module.exports = Video