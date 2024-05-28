import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { userContext } from '../context/userContext';

export const LeagueJoining = () => {
    const [selectedLeague, setSelectedLeague] = useState('');

    const { setUser } = useContext(userContext)

    const handleLeagueChange = (event) => {
        setSelectedLeague(event.target.value);
    };

    const handleJoinLeague = async () => {
        try {
            // Join the league
            const res = await axios.post('http://localhost:3001/leagues/join', { league: selectedLeague }, { withCredentials: true });
            console.log(`Joined ${selectedLeague} league successfully!`);

            setUser(res.data.user);
            // Create the event
            await axios.post('http://localhost:3001/events/', {
                eventType: 'league change',
                leagueName: selectedLeague,
            }, { withCredentials: true });
            console.log(`League change event created for ${selectedLeague} league!`);
            toast(`You successfully joined ${selectedLeague} league`);
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
