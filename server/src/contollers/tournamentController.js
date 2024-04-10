const { Tournament } = require('../models/createTournament');

exports.getTournamentsList = async(req,res) => {
    try {
        const tournamentList = await Tournament.find();
        return res.json(tournamentList);
    } catch (error) {
        console.error('Error getting tournament list:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.createTournament = async (req, res) => {
    try {
        console.log(req.body);
        const { name, description, rules, startDate, endDate, prizePool } = req.body;

        const newTournament = new Tournament({
            name,
            description,
            rules,
            startDate,
            endDate,
            prizePool,
            createdBy: req.user._id 
        });
        
        const savedTournament = await newTournament.save();

        res.status(201).json(savedTournament);
    } catch (error) {
        console.error('Error creating tournament:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
