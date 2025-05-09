const mongoose = require('mongoose');
const { User } = require('../models/user');
const { connectionString } = require('../config/config');

describe('User Model Static Methods', () => {
    beforeAll(async () => {
        await mongoose.connect(connectionString);
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.disconnect();
    });

    it('should create a user if not exists (findOrCreate)', async () => {
        const doc = {
            id: 'u1',
            displayName: 'TestUser',
            email: 'test@example.com',
            picture: 'url',
            provider: 'google'
        };

        const user = await User.findOrCreate('u1', doc);
        expect(user._id).toBe('u1');
        expect(user.displayName).toBe('TestUser');
    });

    it('should return existing user (findOrCreate)', async () => {
        const existing = await User.findById('u1');
        const user = await User.findOrCreate('u1', existing);
        expect(user._id).toBe('u1');
    });

    it('should detect duplicate displayName', async () => {
        const duplicate = await User.isDisplayNameUsed({ _id: 'another' }, 'TestUser');
        expect(duplicate).toBe(true);
    });

    it('should not detect duplicate if only one match is the same user', async () => {
        const duplicate = await User.isDisplayNameUsed({ _id: 'u1' }, 'TestUser');
        expect(duplicate).toBe(false);
    });

});
