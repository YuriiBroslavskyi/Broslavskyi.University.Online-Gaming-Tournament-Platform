const mongoose = require('mongoose');
const { User } = require('../models/user');
const { Tournament } = require('../models/createTournament');
const ChatMessage = require('../models/chatMessage');
const { connectionString } = require('../config/config');

describe('Object Interactions', () => {
    beforeAll(async () => {
        await mongoose.connect(connectionString);
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.disconnect();
    });

    it('should allow a user to post a chat message in a tournament', async () => {
        const tournament = await Tournament.create({
            name: 'Test Tournament',
            description: 'Desc',
            rules: 'Rules',
            startDate: new Date(),
            endDate: new Date(),
            prizePool: 1000,
            createdBy: 'admin',
        });

        const user = await User.create({
            _id: 'u2',
            displayName: 'Chatter',
            email: 'chatter@example.com',
            picture: 'url',
            provider: 'google',
        });

        const message = await ChatMessage.create({
            tournamentId: tournament._id,
            userId: user._id,
            username: user.displayName,
            message: 'Hello World!'
        });

        expect(message.message).toBe('Hello World!');
        expect(message.tournamentId.toString()).toBe(tournament._id.toString());
    });

    it('should link chat message to existing user and tournament', async () => {
        const messages = await ChatMessage.find().populate('tournamentId');
        expect(messages[0].tournamentId.name).toBe('Test Tournament');
    });
});
