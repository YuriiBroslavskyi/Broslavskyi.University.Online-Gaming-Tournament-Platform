const { Router } = require('express');
const { isLoggedIn } = require('../utils/utils');
const { createTournament, getTournamentsList } = require('../contollers/tournamentController'); // Import the controller function for creating tournaments
const Event = require('../models/event');

const router = Router();

router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        // Call the createTournament controller function to create the tournament
        await createTournament(req, res, next);

        // Create an event for the tournament creation
        await Event.create({
            eventType: 'tournament creation',
            userId: req.user._id, // Assuming you have user information available in req.user
            eventName: req.body.name // Pass the tournament name
        });
        
        res.status(201).json({ message: 'Tournament created successfully' });
    } catch (error) {
        console.error('Error creating tournament:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', getTournamentsList);

module.exports = router;
