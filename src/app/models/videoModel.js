const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const slug = require('mongoose-slug-generator')
const Schema = mongoose.Schema

const VideoSchema = new Schema({
    title: String,
    description: String,
    videoId: String,
    slug: { type: String, slug: 'title', unique: true }
}, {
    timestamps: true
})

// add plugins
mongoose.plugin(slug)
VideoSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

const Video = mongoose.model('Video', VideoSchema, 'videos')
module.exports = Video