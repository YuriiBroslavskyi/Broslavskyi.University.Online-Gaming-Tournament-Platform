const { Router } = require('express');
const { isLoggedIn } = require('../utils/utils');
const { createTournament, getTournamentsList, joinTournament, endTournament, deleteTournament, getJoinedUsers, getTournamentById, unjoinTournament } = require('../contollers/tournamentController');

const router = Router();

router.post('/', isLoggedIn, createTournament);

router.get('/', getTournamentsList);

router.get('/:tournamentId', getTournamentById);

router.post('/:tournamentId/join', joinTournament);

router.post('/:tournamentId/end', endTournament);

router.delete('/:tournamentId', deleteTournament);

router.get('/:tournamentId/joinedUsers', getJoinedUsers);

router.post('/unjoin', unjoinTournament);

module.exports = router;
