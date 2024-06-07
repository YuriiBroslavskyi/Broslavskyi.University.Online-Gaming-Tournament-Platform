import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EndTournament = () => {
    const [tournament, setTournament] = useState(null);
    const [joinedUsers, setJoinedUsers] = useState([]);
    const { tournamentId } = useParams();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/tournaments/${tournamentId}`)
            .then((res) => {
                setTournament(res.data);
            })
            .catch((error) => {
                console.error('Error fetching tournament details:', error);
            });

        axios.get(`${process.env.REACT_APP_SERVER_URL}/tournaments/${tournamentId}/joinedUsers`)
            .then((res) => {
                setJoinedUsers(res.data);
            })
            .catch((error) => {
                console.error('Error fetching joined users:', error);
            });
    }, [tournamentId]);

    const distributePrize = () => {
        const prizePool = tournament.prizePool;
        const numParticipants = joinedUsers.length;

        if (numParticipants === 1) {
            return [{ user: joinedUsers[0], prize: prizePool }];
        } else if (numParticipants === 2) {
            const firstPrize = prizePool * 0.7;
            const secondPrize = prizePool * 0.3;
            return [
                { user: joinedUsers[0], prize: Math.round(firstPrize) },
                { user: joinedUsers[1], prize: Math.round(secondPrize) }
            ];
        } else {
            const shuffledUsers = [...joinedUsers].sort(() => Math.random() - 0.5);
            const firstPrize = prizePool * 0.5;
            const secondPrize = prizePool * 0.3;
            const thirdPrize = prizePool * 0.2;
            return [
                { user: shuffledUsers[0], prize: Math.round(firstPrize) },
                { user: shuffledUsers[1], prize: Math.round(secondPrize) },
                { user: shuffledUsers[2], prize: Math.round(thirdPrize) }
            ];
        }
    };

    if (!tournament) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Tournament Ended</h2>
            <p>{tournament.name} has been ended.</p>
            <h3>Prize Distribution</h3>
            <ul>
                {distributePrize().map((entry, index) => (
                    <li key={index}>
                        <div className="user-info">
                            <img src={entry.user?.picture} alt="user photo" className="user-avatar" />
                            <p className="user-name">
                                {entry.user?.displayName}
                            </p>
                        </div>
                        <p>Prize: {entry.prize}</p>
                    </li>

                ))}
            </ul>
        </div>
    );
};

export default EndTournament;
