require('../contollers/googleAuthController');

const passport = require('passport');
const { Router } = require('express');
const { isLoggedIn } = require('../utils/utils');

const router = Router();

router.get(
    '/google',
    passport.authenticate('google-auth', {
        scope: ['email', 'profile'],
    })
);

router.get(
    '/callback',
    passport.authenticate('google-auth', {
        successRedirect: 'http://localhost:3000/',
        failureRedirect: 'http://localhost:3000/login',
        session: true,
    })
);

router.get('/account', isLoggedIn, (req, res) => {
    return res.send(req.user);
});

module.exports = { authRouter: router };
