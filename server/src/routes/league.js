const { Router } = require('express');
const { joinLeague } = require('../contollers/leagueController');

const router = Router();

router.post('/join', joinLeague);

module.exports = router;
