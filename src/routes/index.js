const homeRouter = require('./home')
const authRouter = require('./auth')
const myVideoRouter = require('./my-videos')
const adminRouter = require('./admin')

const authMiddleware = require('../app/middlewares/AuthMiddleware')

function route(app) {
    app.use('/', authMiddleware.optional, homeRouter)
    app.use('/auth', authRouter)
    app.use('/my-videos', authMiddleware.requireAuth, myVideoRouter)
    app.use('/admin', adminRouter)
}

module.exports = route
