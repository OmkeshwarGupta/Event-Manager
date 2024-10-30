const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    try {
        const event = await Event.create({ ...req.body, userId: req.user.userId });
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get one event

exports.getEvent = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event || event.userId !== req.user.userId) return res.status(404).json({ error: 'Event not found' });

        res.json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll({ where: { userId: req.user.userId } });
        res.json(events);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event || event.userId !== req.user.userId) return res.status(404).json({ error: 'Event not found' });

        await event.update(req.body);
        res.json(event);
    } catch (error) {
        console.log("error in update",error);
        res.status(400).json({ meaasge:"in uodate" , error: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        console.log("event",event);
        if (!event || event.userId !== req.user.userId) return res.status(404).json({ error: 'Event not found' });

        await event.destroy();
        res.status(204).json( {message:"Event deleted successfully"});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
