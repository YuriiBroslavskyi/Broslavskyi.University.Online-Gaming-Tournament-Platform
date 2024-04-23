const { Router } = require('express');
const { isLoggedIn } = require('../utils/utils');
const { createTournament, getTournamentsList } = require('../contollers/tournamentController');
const Event = require('../models/event');

const router = Router();

router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        await createTournament(req, res, next);

        await Event.create({
            eventType: 'tournament creation',
            userId: req.user._id, 
            eventName: req.body.name
        });
        
        res.status(201).json({ message: 'Tournament created successfully' });
    } catch (error) {
        console.error('Error creating tournament:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', getTournamentsList);

module.exports = router;
