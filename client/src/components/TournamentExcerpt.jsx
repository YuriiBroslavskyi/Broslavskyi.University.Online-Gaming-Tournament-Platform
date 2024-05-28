import React, { useContext } from 'react';
import { userContext } from '../context/userContext';

const TournamentComponent = ({ tournament, onJoinTournament, onEndTournament, onUnjoinTournament }) => {
    const { user } = useContext(userContext);
    const hasEnded = new Date(tournament.endDate) < new Date();

    return (
        <div className="tournament-card">
            <h3>{tournament.name}</h3>
            <p>Description: {tournament.description}</p>
            <p>Start Date: {new Date(tournament.startDate).toLocaleDateString('en-GB')}</p>
            <p>End Date: {new Date(tournament.endDate).toLocaleDateString('en-GB')}</p>
            <p>Prize Pool: {tournament.prizePool}</p>
            {!tournament.isActive && (
                <p style={{ color: 'red', fontWeight: 'bold' }}>This tournament is ended</p>
            )}
            {user?.tournamentJoined === tournament._id ? (
                <button className="join-button" onClick={() => onUnjoinTournament(tournament._id)}>Unjoin</button>
            ) : tournament.isActive ? (
                <button className="join-button" onClick={() => onJoinTournament(tournament._id)}>Join</button>
            ) : null}
            {user?.tournamentJoined === tournament._id && (
                <button className={`end-button ${tournament.isActive ? '' : 'view-results-button'}`} onClick={() => onEndTournament(tournament._id)}>{tournament.isActive ? 'End Tournament' : 'View results'}</button>
            )}
        </div>
    );
};

export default TournamentComponent;
