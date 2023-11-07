const express = require('express')
const { userLogin, getUser } = require('../controllers/UserController')
const errorHandler = require('../middlewares/errorHandler')
const router = express.Router()

router.get('/users', getUser)
router.post('/login', userLogin)

router.use(errorHandler)

module.exports = router