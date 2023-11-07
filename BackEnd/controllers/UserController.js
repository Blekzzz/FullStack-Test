const { User, Event } = require('../models')
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
            res.status(200).json({ message: "Login success" })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController