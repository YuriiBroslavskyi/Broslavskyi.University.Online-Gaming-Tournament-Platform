require('../contollers/googleAuthController');
const { clientUrl } = require('../config/config');

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
        successRedirect: `${clientUrl}/`,
        failureRedirect: `${clientUrl}/login`,
        session: true,
    })
);

router.get('/account', isLoggedIn, (req, res) => {
    return res.send(req.user);
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout((error) => {
        if (error) {
            console.error(error);
            return res.status(500).json(error);
        }
        return res.sendStatus(200);

    })
});

module.exports = { authRouter: router };
