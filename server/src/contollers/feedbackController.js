const { Feedback } = require('../models/feedback');

exports.createFeedback = async (req, res) => {
    try {
        const { name, description } = req.body;
        let { topic } = req.body;

        // Logic to handle empty or invalid topic selection
        if (!topic || !['league-issue', 'tournament-issue', 'profile-issue', 'feedback-mechanism-issue', 'notification-issue'].includes(topic)) {
            // Default to a generic topic or handle the case as appropriate
            topic = 'Other';
        }

        const newFeedback = new Feedback({
            name,
            topic,
            description,
            createdBy: req.user._id
        });

        const savedFeedback = await newFeedback.save();

        res.json(savedFeedback);
    } catch (error) {
        console.error('Error creating feedback:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
