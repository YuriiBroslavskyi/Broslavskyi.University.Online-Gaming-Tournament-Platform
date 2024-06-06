const { Schema, model } = require('mongoose');

const FeedbackSchema = new Schema({
    name: { type: String, required: true },
    topic: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: String, required: true },
});

FeedbackSchema.statics.createOrUpdate = async function (id, data) {
    try {

        const newFeedback = await this.create(data);
        return newFeedback;
    } catch (error) {
        throw error;
    }
};

const Feedback = model('Feedback', FeedbackSchema, 'feedbacks');

module.exports = { Feedback };
