const homeRouter = require('./home')
const authRouter = require('./auth')
const userRouter = require('./user')
const adminRouter = require('./admin')

const authMiddleware = require('../app/middlewares/AuthMiddleware')

function route(app) {
    app.use('/', authMiddleware.optional, homeRouter)
    app.use('/auth', authRouter)
    app.use('/user/', authMiddleware.requireAuth, userRouter)
    app.use('/admin', adminRouter)
    app.use('/', (req, res) => {
        res.render('404.pug')
    })
}

module.exports = route
