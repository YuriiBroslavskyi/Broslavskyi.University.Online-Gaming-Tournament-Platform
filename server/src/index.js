const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const { sessionSecret, port, connectionString } = require('../config/config');
const { authRouter } = require('./routes/auth');
const tournamentRouter = require('./routes/tournament');
const leagueJoiningRouter = require('./routes/league');
const eventRouter = require('./routes/eventRouter');
const feedbackRouter = require('./routes/feedback')

const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    })
);
app.use(
    session({ secret: sessionSecret, saveUninitialized: false, resave: false })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/tournaments', tournamentRouter);
app.use('/leagues', leagueJoiningRouter);
app.use('/events', eventRouter);
app.use('/feedbacks', feedbackRouter);

const start = async () => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(port, () => {
            console.log('Server is running on port', port);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

start();
