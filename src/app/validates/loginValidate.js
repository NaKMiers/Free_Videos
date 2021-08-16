const User = require('../models/userModel')
const md5 = require('md5')

async function LoginValidate(req, res, next) {
    let username = req.body.username
    let password = md5(req.body.password)
    
    let values = req.body
    let errors = []

    var users = await User.find({})
    let user = users.find(user => user.username == username)
    if (user) {
        if (user.password == password) {
            res.cookie('userId', user._id, {
                signed: true,
            })
            res.redirect('/my-videos')
        } else {
            errors.push({ passError: '❌ Password is invalid ❌' })
            res.render('auth/login', { errors, values })
        }  
    } else {
        errors.push({ userError: '❌ User is not exits ❌' })
        res.render('auth/login', { errors, values })
    }
}

module.exports = LoginValidate