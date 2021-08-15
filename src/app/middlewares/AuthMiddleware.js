const User = require('../models/userModel')

class AuthMiddleware {
    requireAuth = async function(req, res, next) {
        if (!req.cookies.userId) {
            res.render('auth/login')
        } else {
            let user = await User.find({ _id: req.cookies.userId })
            res.locals.user = user[0]
            next()
        }
    }

    optional = async function(req, res, next) {
        let user = await User.find({ _id: req.cookies.userId })
        res.locals.user = user[0]
        next()
    }
}

module.exports = new AuthMiddleware