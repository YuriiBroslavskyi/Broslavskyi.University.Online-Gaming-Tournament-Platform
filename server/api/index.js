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
const MongoStore = require('connect-mongo');
const ChatMessage = require("../models/chatMessage");
const { verifyGoogleToken } = require("../utils/utils.js");
const http = require('http');
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

mongoose.connect(connectionString);
const db = mongoose.connection;

app.set('trust proxy', 1);

app.use(cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(session({
    secret: sessionSecret,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: clientUrl.startsWith('https') ? 'none' : 'strict',
        secure: clientUrl.startsWith('https'),
    },
    store: new MongoStore({ mongoUrl: db.client.s.url }),
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

io.on("connection", (socket) => {
    console.log(`A user ${socket.id} connected`);

    socket.on("sendMessage", ({ tournamentId, message, username }) => {
        console.log(`📩 New message in tournament ${tournamentId}: ${message}`);
        io.emit("newMessage", { tournamentId, message, username });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

app.use('/auth', authRouter);
app.use('/tournaments', tournamentRouter);
app.use('/leagues', leagueJoiningRouter);
app.use('/events', eventRouter);
app.use('/feedbacks', feedbackRouter);
app.use('/profile', profile);
app.use('/chat', profile);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
