const { Router } = require('express');
const { isLoggedIn } = require('../utils/utils');
const { createFeedback } = require('../contollers/feedbackController');

const router = Router();

router.post('/', isLoggedIn, createFeedback);

module.exports = router;
