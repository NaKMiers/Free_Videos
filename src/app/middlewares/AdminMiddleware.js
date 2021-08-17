
class AdminMiddleware {
    requireAdminAuth = async function(req, res, next) {
        if (!req.signedCookies.adminAuthorize) {
            res.redirect('/admin/login')
        } else {
            next()
        }
    }
}

module.exports = new AdminMiddleware