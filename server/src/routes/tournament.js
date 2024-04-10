const { Router } = require('express');
const { isLoggedIn } = require('../utils/utils');
const { createTournament, getTournamentsList } = require('../contollers/tournamentController'); // Import the controller function for creating tournaments

const router = Router();

router.post('/', isLoggedIn, createTournament);

router.get('/', getTournamentsList)

module.exports = router;
