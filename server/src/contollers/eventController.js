const Event = require('../models/event');

exports.createEvent = async (req, res) => {
    try {
        const { eventType, eventName, leagueName } = req.body;
        const event = new Event({ eventType, userId:req.user._id, eventName, leagueName });
        await event.save();
        res.status(201).json({ message: 'Event created successfully' });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getLatestEvents = async (req, res) => {
    try {
        
        let events = await Event.find().sort({ timestamp: -1 }).limit(10); // Fetch latest 10 events
        events = await Promise.all(
            events.map((event) => event.populate('userId'))
        );
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

