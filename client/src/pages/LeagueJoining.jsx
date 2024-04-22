import React, { useState } from 'react';
import axios from 'axios';

export const LeagueJoining = () => {
    const [selectedLeague, setSelectedLeague] = useState('');

    const handleLeagueChange = (event) => {
        setSelectedLeague(event.target.value);
    };

    const handleJoinLeague = async () => {
        try {
            await axios.post('http://localhost:3001/leagues/join', { league: selectedLeague }, { withCredentials: true });
            console.log(`Joined ${selectedLeague} league successfully!`);
        } catch (error) {
            console.error('Error joining league:', error);
        }
    };

    return (
        <div className="league-container">
            <h1>League Joining</h1>
            <select className="select-league" value={selectedLeague} onChange={handleLeagueChange}>
                <option value="">Select a league</option>
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="emerald">Emerald</option>
                <option value="diamond">Diamond</option>
            </select>
            <button className="join-button" onClick={handleJoinLeague}>Join League</button>
        </div>
    );
};
