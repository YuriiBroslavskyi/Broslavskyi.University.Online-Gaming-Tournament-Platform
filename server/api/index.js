const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const { sessionSecret, port, connectionString, clientUrl } = require('../config/config');
const { authRouter } = require('../routes/auth');
const tournamentRouter = require('../routes/tournament');
const leagueJoiningRouter = require('../routes/league');
const eventRouter = require('../routes/eventRouter');
const feedbackRouter = require('../routes/feedback');
const profile = require('../routes/profile');
const app = express();
const MongoStore = require('connect-mongo');

mongoose.connect(
    `${connectionString}`
);
const db = mongoose.connection;

app.set('trust proxy', 1);

app.use(
    cors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    })
);
app.use(
    session({
        secret: sessionSecret,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: clientUrl.startsWith('https') ? 'none' : 'strict',
            secure: clientUrl.startsWith('https') ? true : false,
        },
        store: new MongoStore({
            mongoUrl: db.client.s.url,
        }),

    }
    )

);


app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/tournaments', tournamentRouter);
app.use('/leagues', leagueJoiningRouter);
app.use('/events', eventRouter);
app.use('/feedbacks', feedbackRouter);
app.use('/profile', profile);

const start = async () => {
    try {
        app.listen(port, () => {
            console.log('Server is running on port', port);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

start();

module.exports = app;