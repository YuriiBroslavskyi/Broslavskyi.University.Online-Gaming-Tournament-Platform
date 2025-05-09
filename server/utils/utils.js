const { OAuth2Client } = require("google-auth-library");
const { clientID } = require('../config/config.js');

// ✅ Initialize OAuth2Client
const client = new OAuth2Client(clientID);

const isLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401);
};

const verifyGoogleToken = async (token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: clientID,
        });
        return ticket.getPayload();
    } catch (error) {
        console.error("Invalid Google Token:", error);
        return null;
    }
};

module.exports = {
    isLoggedIn,
    verifyGoogleToken,
};
