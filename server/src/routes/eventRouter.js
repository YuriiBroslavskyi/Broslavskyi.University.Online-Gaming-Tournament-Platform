const express = require('express');
const router = express.Router();
const eventController = require('../contollers/eventController');

router.post('/events', eventController.createEvent);
router.get('/events/latest', eventController.getLatestEvents);

module.exports = router;
