const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
    static async getUser(req, res, next) {
        try {
            const users = await User.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                }
            })

            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }

    static async userLogin(req, res, next) {
        try {
            const { username, password } = req.body
            if (!username || !password) throw ({ name: "EmailPasswordRequired" })

            let user = await User.findOne({
                where: {
                    username
                }
            })
            if (!user) throw ({ name: "UserNotFound" })

            const isValid = comparePassword(password, user.password)
            if (!isValid) throw ({ name: "InvalidPassword" })

            const token = signToken({ id: user.id, username: username, role: user.role })

            res.status(200).json({ access_token: token })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController