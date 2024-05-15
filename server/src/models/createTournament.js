const { Schema, model } = require('mongoose');

const TournamentSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    rules: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    prizePool: { type: Number, required: true },
    createdBy: { type: String, required: true },
    isActive: { type: Boolean, default: true }
});

TournamentSchema.statics.createOrUpdate = async function (id, data) {
    try {
        const tournament = await this.findById(id);

        if (tournament) {
            tournament.name = data.name;
            tournament.description = data.description;
            tournament.rules = data.rules;
            tournament.startDate = data.startDate;
            tournament.endDate = data.endDate;
            tournament.prizePool = data.prizePool;
            await tournament.save();
            return tournament;
        } else {
            const newTournament = await this.create(data);
            return newTournament;
        }
    } catch (error) {
        throw error;
    }
};

const Tournament = model('Tournament', TournamentSchema, 'tournaments');

module.exports = { Tournament };
