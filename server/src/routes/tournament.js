const { Router } = require('express');
const { isLoggedIn } = require('../utils/utils');
const { createTournament, getTournamentsList } = require('../contollers/tournamentController');

const router = Router();

router.post('/', isLoggedIn, createTournament);

router.get('/', getTournamentsList);

module.exports = router;
