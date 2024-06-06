const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    eventType: { type: String, required: true },
    userId: { type: String, ref: 'User', required: true },
    eventName: { type: String },
    leagueName: { type: String },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);