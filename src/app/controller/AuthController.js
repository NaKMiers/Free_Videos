const User = require('../models/userModel')
const loginValidate = require('../validates/loginValidate')
const registryValidate = require('../validates/registryValidate')

class AuthController {
    // [GET] /auth/login
    showLogin(req, res, next) {
        res.render('auth/login')
    }

    // [POST] /auth/login
    login = async function (req, res, next) {
        loginValidate(req, res, next)
    }

    // [GET] /auth/log-out
    logOut = async function (req, res, next) {
        res.clearCookie('userId')        
        res.redirect('/')
    }

    // [GET] /auth/login
    showRegistry(req, res, next) {
        res.render('auth/registry')
    }

    // [POST] /auth/login
    registry = async function (req, res, next) {
        let newUserData = await registryValidate(req, res, next)
        if (newUserData) {
            const newUser = new User(newUserData)
            newUser.save()
                .then(() => {
                    User.find({})
                        .then(users => {
                            let user = users.find(user => user.username == newUserData.username)
                            res.cookie('userId', user._id, {
                                signed: true,
                            })
                            res.redirect('/')
                        })
                })
                .catch(error => console.log(error))
        }
    }
    
}

module.exports = new AuthController