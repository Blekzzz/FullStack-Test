const { User, Event } = require('../models')

class EventController {
    static async postEvents(req, res, next) {
        try {
            const { eventName, proposedDate1, proposedDate2, proposedDate3, proposedLocation, postalCode, vendorUserId } = req.body;

            const event = await Event.create({
                eventName,
                proposedDate1,
                proposedDate2,
                proposedDate3,
                proposedLocation,
                postalCode,
                createdByUserId: req.user.id,
                vendorUserId
            });

            res.status(201).json(event);
        } catch (error) {
            next(error)
        }
    }

    static async getEventVendor(req, res, next) {
        try {
            const events = await Event.findAll({
                where: { vendorUserId: req.user.id },
                include: [
                    {
                        model: User, as: 'creator',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'password']
                        }
                    },
                    {
                        model: User, as: 'vendor',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'password']
                        }
                    }
                ]
            });

            res.status(200).json(events);
        } catch (error) {
            next(error)
        }
    }

    static async getEventCompany(req, res, next) {
        try {
            const events = await Event.findAll({
                where: { createdByUserId: req.user.id },
                include: [
                    {
                        model: User, as: 'creator',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'password']
                        }
                    },
                    {
                        model: User, as: 'vendor',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'password']
                        }
                    }
                ]
            });

            res.status(200).json(events);
        } catch (error) {
            next(error)
        }
    }

    static async getEventDetail(req, res, next) {
        try {
            const { eventId } = req.params;

            const event = await Event.findByPk(eventId, {
                include: [
                    {
                        model: User, as: 'creator',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'password']
                        }
                    },
                    {
                        model: User, as: 'vendor',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'password']
                        }
                    }
                ],
            });

            if (!event) throw ({ name: "NotFound" })

            res.status(200).json(event);
        } catch (error) {
            next(error)
        }
    }

    static async eventApprove(req, res, next) {
        try {
            const { eventId } = req.params;
            const { confirmedDate } = req.body;
            
            const event = await Event.findByPk(eventId);

            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }

            if (req.user.role !== 'vendor_admin') {
                return res.status(403).json({ message: 'You are not authorized to approve events' });
            }

            event.status = 'Approved';
            event.confirmedDate = confirmedDate;

            await event.save();

            res.json(event);
        } catch (error) {
            next(error)
        }
    }

    static async eventReject(req, res, next) {
        try {
            const { eventId } = req.params;
            const { reason } = req.body;

            console.log(eventId, '-> ini event id')
            console.log(reason, '-> ini reason')

            const event = await Event.findByPk(eventId);

            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }

            if (req.user.role !== 'vendor_admin') {
                return res.status(403).json({ message: 'You are not authorized to reject events' });
            }

            event.status = 'Rejected';
            event.remarks = reason;

            await event.save();

            res.json(event);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = EventController