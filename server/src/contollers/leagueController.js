const {User} = require('../models/user');

const joinLeague = async (req, res) => {
    try {
        const { league } = req.body;

        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.league = league;
        await user.save();

        res.status(200).json({ success: true, message: `Joined ${league} league successfully!` });
    } catch (error) {
        console.error('Error joining league:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = {
    joinLeague
};
