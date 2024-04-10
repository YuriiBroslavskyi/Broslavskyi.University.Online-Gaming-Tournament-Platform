import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Home = () => {
    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/tournaments')
            .then((res) => {
                setTournaments(res.data);
            })
            .catch((error) => {
                console.error('Error fetching tournaments:', error);
            });
    }, []);

    return (
        <section>
            <h2>All Tournaments</h2>
            <div className="tournament-list">
                {tournaments.map((tournament) => (
                    <div key={tournament._id} className="tournament">
                        <h3>{tournament.name}</h3>
                        <p>Description: {tournament.description}</p>
                        <p>Start Date: {tournament.startDate}</p>
                        <p>End Date: {tournament.endDate}</p>
                        <p>Prize Pool: {tournament.prizePool}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
