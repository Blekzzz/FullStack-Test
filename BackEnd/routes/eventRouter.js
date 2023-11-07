const express = require('express')
const { postEvents, getEvents, getEventDetail, eventApprove, eventReject } = require('../controllers/EventController')
const eventRouter = express.Router()

eventRouter.post('/', postEvents)
eventRouter.get('/', getEvents)
eventRouter.get('/:eventId', getEventDetail)
eventRouter.put('/:eventId/approve', eventApprove)
eventRouter.put('/:eventId/reject', eventReject)

module.exports = eventRouter