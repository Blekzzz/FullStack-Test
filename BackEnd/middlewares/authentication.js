const { verifyToken } = require("../helpers/jwt")
const { User } = require('../models')

async function Authentication(req, res, next) {
    try {
        const { access_token } = req.headers
        if (!access_token) throw ({ name: "AuthenticationError" })

        const verified = verifyToken(access_token)
        if (!verified) throw ({ name: "AuthenticationError" })

        const user = await User.findByPk(verified.id)
        if (!user) throw ({ name: "AuthenticationError" })

        req.user = {
            id: verified.id,
            username: verified.username,
            role: user.role
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = Authentication