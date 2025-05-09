const request = require('supertest');
const express = require('express');
const feedbackController = require('../contollers/feedbackController');
const { Feedback } = require('../models/feedback');

jest.mock('../models/feedback');

const app = express();
app.use(express.json());
app.post('/feedback', (req, res, next) => {
    req.user = { _id: 'user123' };
    next();
}, feedbackController.createFeedback);

describe('Feedback Controller Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create feedback with valid data', async () => {
        const feedbackData = {
            name: 'Yurii Broslavskyi',
            topic: 'tournament-issue',
            description: 'Problem with tournament registration'
        };

        const mockFeedback = { ...feedbackData, createdBy: 'user123', save: jest.fn().mockResolvedValue(feedbackData) };
        Feedback.mockImplementation(() => mockFeedback);

        const response = await request(app)
            .post('/feedback')
            .send(feedbackData);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(feedbackData);
    });

    it('should default to topic "Other" if an invalid topic is provided', async () => {
        const feedbackData = {
            name: 'Yurii Broslavskyi',
            topic: 'invalid-topic',
            description: 'An unrelated issue'
        };

        const mockFeedback = { ...feedbackData, topic: 'Other', createdBy: 'user123', save: jest.fn().mockResolvedValue({ ...feedbackData, topic: 'Other' }) };
        Feedback.mockImplementation(() => mockFeedback);

        const response = await request(app)
            .post('/feedback')
            .send(feedbackData);

        expect(response.status).toBe(200);
        expect(response.body.topic).toBe('Other');
    });

    it('should return 500 if feedback creation fails', async () => {
        const feedbackData = {
            name: 'Error Test',
            topic: 'profile-issue',
            description: 'Testing error handling'
        };

        Feedback.mockImplementation(() => {
            throw new Error('Database error');
        });

        const response = await request(app)
            .post('/feedback')
            .send(feedbackData);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Internal server error');
    });

    it('should handle missing topic by setting to "Other"', async () => {
        const feedbackData = {
            name: 'No Topic',
            description: 'No topic provided'
        };

        const mockFeedback = { ...feedbackData, topic: 'Other', createdBy: 'user123', save: jest.fn().mockResolvedValue({ ...feedbackData, topic: 'Other' }) };
        Feedback.mockImplementation(() => mockFeedback);

        const response = await request(app)
            .post('/feedback')
            .send(feedbackData);

        expect(response.status).toBe(200);
        expect(response.body.topic).toBe('Other');
    });

    it('should create feedback even with optional fields missing', async () => {
        const feedbackData = {
            name: 'Yurii Broslavskyi'
        };

        const mockFeedback = { ...feedbackData, topic: 'Other', description: '', createdBy: 'user123', save: jest.fn().mockResolvedValue({ ...feedbackData, topic: 'Other', description: '' }) };
        Feedback.mockImplementation(() => mockFeedback);

        const response = await request(app)
            .post('/feedback')
            .send(feedbackData);

        expect(response.status).toBe(200);
        expect(response.body.topic).toBe('Other');
        expect(response.body.description).toBe('');
    });

    it('should return 400 if name is missing', async () => {
        const feedbackData = {
            topic: 'profile-issue',
            description: 'Missing name field'
        };

        const response = await request(app)
            .post('/feedback')
            .send(feedbackData);

        expect(response.status).toBe(400);
    });

    it('should trim whitespace from name and description', async () => {
        const feedbackData = {
            name: '   Trimmed User   ',
            topic: 'tournament-issue',
            description: '   Extra spaces   '
        };

        const mockFeedback = { ...feedbackData, name: 'Trimmed User', description: 'Extra spaces', createdBy: 'user123', save: jest.fn().mockResolvedValue({ ...feedbackData, name: 'Trimmed User', description: 'Extra spaces' }) };
        Feedback.mockImplementation(() => mockFeedback);

        const response = await request(app)
            .post('/feedback')
            .send(feedbackData);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Trimmed User');
        expect(response.body.description).toBe('Extra spaces');
    });

    it('should not create feedback if description is too long', async () => {
        const feedbackData = {
            name: 'Yurii Broslavskyi',
            topic: 'notification-issue',
            description: 'a'.repeat(1001)
        };

        const response = await request(app)
            .post('/feedback')
            .send(feedbackData);

        expect(response.status).toBe(400);
    });

    it('should return 400 if no data is provided', async () => {
        const response = await request(app)
            .post('/feedback')
            .send({});

        expect(response.status).toBe(400);
    });

    it('should ensure topic is one of the allowed values', async () => {
        const feedbackData = {
            name: 'Topic Test',
            topic: 'league-issue',
            description: 'Testing allowed topics'
        };

        const mockFeedback = { ...feedbackData, createdBy: 'user123', save: jest.fn().mockResolvedValue(feedbackData) };
        Feedback.mockImplementation(() => mockFeedback);

        const response = await request(app)
            .post('/feedback')
            .send(feedbackData);

        expect(response.status).toBe(200);
    });
});
