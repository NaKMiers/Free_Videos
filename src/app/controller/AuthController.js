const User = require('../models/userModel')
const loginValidator = require('../validates/loginValidate')

class AuthController {
    // [GET] /auth/login
    index(req, res, next) {
        res.render('auth/login')
    }

    // [POST] /auth/login
    login = async function (req, res, next) {
        let [ isValidLogin, user ] = await loginValidator(req, res, next)
        if (isValidLogin) {
            res.cookie('userId', user._id)
        }
    }
}

module.exports = new AuthController