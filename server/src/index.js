const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const { sessionSecret, port, connectionString } = require('../config/config');
const { authRouter } = require('./routes/auth');

const app = express();

// * Middleware
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
app.use(passport.session());
app.use(passport.initialize());

// * Routing
app.use('/auth', authRouter);

const start = () => {
    try {
        mongoose.connect(connectionString);
        app.listen(port);
        console.log('Listening on port ', port);
    } catch (e) {
        console.log(e.message);
    }
};

start();
