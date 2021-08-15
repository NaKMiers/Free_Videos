const User = require('../models/userModel')
const loginValidator = require('../validates/loginValidate')

class AuthController {
    // [GET] /auth/login
    index(req, res, next) {
        res.render('auth/login')
    }

    // [POST] /auth/login
    login = async function (req, res, next) {
        loginValidator(req, res, next)
    }
}

module.exports = new AuthController