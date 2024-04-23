const express = require('express');
const router = express.Router();
const eventController = require('../contollers/eventController');

router.post('/', eventController.createEvent);
router.get('/latest', eventController.getLatestEvents);

module.exports = router;
