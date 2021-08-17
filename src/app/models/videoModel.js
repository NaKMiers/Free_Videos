const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema

const VideoSchema = new Schema({
    title: String,
    description: String,
    videoId: String,
}, {
    timestamps: true
})

// add plugins
VideoSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

const Video = mongoose.model('Video', VideoSchema, 'videos')
module.exports = Video