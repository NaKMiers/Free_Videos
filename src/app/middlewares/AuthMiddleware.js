const User = require('../models/userModel')

class AuthMiddleware {
    requireAuth = async function(req, res, next) {
        if (!req.signedCookies.userId) {
            res.redirect('/auth/login')
        } else {
            let user = await User.find({ _id: req.signedCookies.userId })
            res.locals.user = user[0]
            next()
        }
    }

    optional = async function(req, res, next) {
        let user = await User.find({ _id: req.signedCookies.userId })
        res.locals.user = user[0]
        next()
    }
}

module.exports = new AuthMiddleware