const express = require('express')
const { postEvents, getEvents, getEventDetail, eventApprove, eventReject, getEventCompany, getEventVendor } = require('../controllers/EventController')
const eventRouter = express.Router()

eventRouter.post('/', postEvents)
eventRouter.get('/company', getEventCompany)
eventRouter.get('/vendor', getEventVendor)
eventRouter.get('/:eventId', getEventDetail)
eventRouter.put('/:eventId/approve', eventApprove)
eventRouter.put('/:eventId/reject', eventReject)

module.exports = eventRouter