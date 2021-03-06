const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    myVideos: Array,
    avatar: String,
}, {
    timestamp: true
})

const User = mongoose.model('User', UserSchema, 'users')
module.exports = User