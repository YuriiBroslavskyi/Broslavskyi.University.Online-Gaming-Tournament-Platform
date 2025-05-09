const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema(
    {
        tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: "Tournament", required: true },
        userId: { type: String, required: true },
        username: { type: String, required: true },
        message: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
    },
    { collection: "chatMessages" }
);

module.exports = mongoose.model("ChatMessage", chatMessageSchema);
