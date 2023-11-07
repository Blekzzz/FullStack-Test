const { verifyToken } = require("../helpers/jwt")
const { User } = require('../models')

async function userAuthentication(req, res, next) {
    try {
        const { access_token } = req.headers
        if (!access_token) throw ({ name: "AuthenticationError" })

        const verified = verifyToken(access_token)
        if (!verified) throw ({ name: "AuthenticationError" })

        const user = await User.findByPk(verified.id)
        if (!user) throw ({ name: "AuthenticationError" })

        req.user = {
            id: verified.id,
            email: verified.email
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = userAuthentication