const { Tournament } = require('../models/createTournament');
const { User } = require('../models/user');

exports.getTournamentsList = async (req, res) => {
    try {
        const tournamentList = await Tournament.find();
        return res.json(tournamentList);
    } catch (error) {
        console.error('Error getting tournament list:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

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

        res.json(savedTournament);
    } catch (error) {
        console.error('Error creating tournament:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.joinTournament = async (req, res) => {
    try {
        const { tournamentId } = req.params;
        const userId = req.user._id;

        let user = await User.findById(userId);

        if (user.isJoinedToTournament) {
            return res.status(400).json({ message: 'You are already joined to tournament' });
        }

        user = await User.findByIdAndUpdate(userId, {
            $set: {
                isJoinedToTournament: true,
                tournamentJoined: tournamentId
            }
        }, { new: true });

        res.json({ message: 'Successfully joined tournament', user });
    } catch (error) {
        console.error('Error joining tournament:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteTournament = async (req, res) => {
    try {
        const { tournamentId } = req.params;
        const joinedUsers = await User.find({ tournamentId });

        if (joinedUsers.length > 0) {
            for (let user of joinedUsers) {
                await user.updateOne({
                    $set: {
                        isJoinedToTournament: false,
                        tournamentJoined: null
                    }
                }).exec();
            }
        }
        await Tournament.findByIdAndDelete(tournamentId);

        // You may need to perform additional cleanup actions here

        res.json({ message: 'Tournament deleted successfully' });
    } catch (error) {
        console.error('Error deleting tournament:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.endTournament = async (req, res) => {
    try {
        const { tournamentId } = req.params;

        await Tournament.findByIdAndUpdate(tournamentId, {
            isActive: false,
        });

        res.json({ message: 'Tournament ended successfully' });
    } catch (error) {
        console.error('Error ending tournament:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getJoinedUsers = async (req, res) => {
    try {
        const { tournamentId: tournamentJoined } = req.params;
        const joinedUsers = await User.find({ tournamentJoined });
        res.json(joinedUsers);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getTournamentById = async (req, res) => {
    try {
        const { tournamentId } = req.params;
        const tournament = await Tournament.findById(tournamentId);
        res.json(tournament);
    } catch (error) {
        console.error(error);

        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.unjoinTournament = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findByIdAndUpdate(userId, {
            $set: {
                isJoinedToTournament: false,
                tournamentJoined: null
            }
        }, { new: true }
        );
        res.json(user)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

}