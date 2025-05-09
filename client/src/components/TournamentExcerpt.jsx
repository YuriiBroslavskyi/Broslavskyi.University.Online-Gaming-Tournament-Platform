import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Added navigate for routing
import { userContext } from '../context/userContext';

const TournamentComponent = ({ tournament, onJoinTournament, onEndTournament, onUnjoinTournament }) => {
    const { user } = useContext(userContext);
    const navigate = useNavigate(); // ✅ Initialize navigation
    const hasEnded = new Date(tournament.endDate) < new Date();

    return (
        <div className="tournament-card">
            <h3>{tournament.name}</h3>
            <p>Description: {tournament.description}</p>
            <p>Start Date: {new Date(tournament.startDate).toLocaleDateString('en-GB')}</p>
            <p>End Date: {new Date(tournament.endDate).toLocaleDateString('en-GB')}</p>
            <p>Prize Pool: {tournament.prizePool}</p>

            {/* ✅ Show chat button only if the user is part of the tournament */}
            {user?.tournamentJoined === tournament._id && (
                <button onClick={() => navigate(`/tournaments/${tournament._id}/chat`)}>
                    Join Live Chat
                </button>
            )}

            {!tournament.isActive && (
                <p style={{ color: 'red', fontWeight: 'bold' }}>This tournament is ended</p>
            )}

            {user?.tournamentJoined === tournament._id ? (
                <button className="join-button" onClick={() => onUnjoinTournament(tournament._id)}>Unjoin</button>
            ) : tournament.isActive ? (
                <button className="join-button" onClick={() => onJoinTournament(tournament._id)}>Join</button>
            ) : null}

            {user?.tournamentJoined === tournament._id && (
                <button className={`end-button ${tournament.isActive ? '' : 'view-results-button'}`} onClick={() => onEndTournament(tournament._id)}>
                    {tournament.isActive ? 'End Tournament' : 'View results'}
                </button>
            )}
        </div>
    );
};

export default TournamentComponent;
