const express = require('express')
const { userLogin, getUser, getVendor } = require('../controllers/UserController')
const errorHandler = require('../middlewares/errorHandler')
const eventRouter = require('./eventRouter')
const Authentication = require('../middlewares/authentication')
const router = express.Router()

router.post('/login', userLogin)

router.use(Authentication)

router.get('/users', getUser)
router.get('/users/vendor', getVendor)
router.use('/events', eventRouter)

router.use(errorHandler)

module.exports = router