import React, { useContext } from 'react';
import { userContext } from '../context/userContext';

const TournamentComponent = ({ tournament, onJoinTournament, onEndTournament, onUnjoinTournament }) => {
    const { user } = useContext(userContext);

    return (
        <div className="tournament">
            <h3>{tournament.name}</h3>
            <p>Description: {tournament.description}</p>
            <p>Start Date: {new Date(tournament.startDate).toLocaleDateString('en-GB')}</p>
            <p>End Date: {new Date(tournament.endDate).toLocaleDateString('en-GB')}</p>
            <p>Prize Pool: {tournament.prizePool}</p>
            {user?.tournamentJoined === tournament._id ? (
                <button onClick={() => onUnjoinTournament(tournament._id)}>Unjoin</button>
            ) : tournament.isActive ? (
                <button onClick={() => onJoinTournament(tournament._id)}>Join</button>
            ) : null}
            {user?.tournamentJoined === tournament._id && (
                <button onClick={() => onEndTournament(tournament._id)}>{tournament.isActive ? 'End Tournament' : 'View results'}</button>
            )}
        </div>
    );
};

export default TournamentComponent;
