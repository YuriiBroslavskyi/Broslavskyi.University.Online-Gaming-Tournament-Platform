const { clientID, clientSecret } = require('../config/config');
const passport = require('passport');
const { User } = require('../models/user');

const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(
    'google-auth',
    new GoogleStrategy(
        {
            clientID,
            clientSecret,
            callbackURL: 'auth/callback',
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                const currentUser = await User.findOrCreate(
                    profile.id,
                    profile
                );

                return done(null, currentUser);
            } catch (e) {
                console.log(e.message);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const currentUser = await User.findById(id);
    done(null, currentUser);
});
