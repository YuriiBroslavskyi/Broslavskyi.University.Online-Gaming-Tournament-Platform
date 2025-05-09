const { Feedback } = require('../models/feedback');

exports.createFeedback = async (req, res) => {
    try {
        const { name, description } = req.body;
        let { topic } = req.body;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Request body cannot be empty' });
        }

        if (!name || name.trim() === '') {
            return res.status(400).json({ message: 'Name is required' });
        }

        if (description && description.length > 500) {
            return res.status(400).json({ message: 'Description is too long' });
        }

        if (!topic || !['league-issue', 'tournament-issue', 'profile-issue', 'feedback-mechanism-issue', 'notification-issue'].includes(topic)) {
            topic = 'Other';
        }

        const newFeedback = new Feedback({
            name: name.trim(),
            topic,
            description: description ? description.trim() : '',
            createdBy: req.user._id
        });

        const savedFeedback = await newFeedback.save();

        res.json(savedFeedback);
    } catch (error) {
        console.error('Error creating feedback:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
