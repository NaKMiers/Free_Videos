const User = require('../models/userModel')
const md5 = require('md5')

async function RegistryValidate(req, res, next) {
    let values = req.body

    let name = values.name.trim()
    let username = values.username.trim()
    let email = values.email.trim()
    let password = values.password
    let retypePassword = values.retypePassword

    let errors = []

    let matchUsername = await User.find({ username: username })
    if (matchUsername[0]) {
        errors.push('Username have already been. Please enter the other username.')
    } else {
        if (username.length > 20) {
            errors.push('Username must be at least 20 characters.')
        }
    }

    let matchEmail = await User.find({ email: email })
    if (matchEmail[0]) {
        errors.push('Email have already been. Please enter the other email.')
    }

    if (password.length < 6) {
        errors.push('Password must be greater than 5 characters.')
    } else if (retypePassword != password) {
        errors.push('Password does not match, please re-enter.')
    }

    if (errors.length > 0) {
        let errorIndexInErrors = []

        errorIndexInErrors.push(errors.indexOf('Username have already been. Please enter the other username.'))
        errorIndexInErrors.push(errors.indexOf('Email have already been. Please enter the other email.'))
        errorIndexInErrors.push(errors.indexOf('Password must be greater than 5 characters.'))
        errorIndexInErrors.push(errors.indexOf('Password does not match, please re-enter.'))
        errors.push('')

        res.render('auth/registry', { errors, values, errorsIndex: errorIndexInErrors })
    } else {
        let newUserData = {
            name,
            username,
            email,
            password: md5(password),
            avatar: '/'
        }
        return newUserData
    }
}

module.exports = RegistryValidate