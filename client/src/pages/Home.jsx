import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TournamentComponent from '../components/TournamentExcerpt';
import { userContext } from '../context/userContext';

export const Home = () => {
    const [tournaments, setTournaments] = useState([]);
    const navigate = useNavigate();
    const { setUser } = useContext(userContext);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/tournaments`)
            .then((res) => {
                setTournaments(res.data);
            })
            .catch((error) => {
                console.error('Error fetching tournaments:', error);
            });
    }, []);

    const handleJoinTournament = async (tournamentId) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/tournaments/${tournamentId}/join`, {}, { withCredentials: true });
            console.log(`Joined tournament with ID: ${tournamentId}`);
            setUser(res.data.user);
        } catch (error) {
            const { response } = error;
            toast.error(response.data.message);
        }
    };

    const handleEndTournament = async (tournamentId) => {
        try {
            const tournamentResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/tournaments/${tournamentId}/end`, {}, { withCredentials: true });
            console.log(`Ended tournament with ID: ${tournamentId}`);

            await axios.post(`${process.env.REACT_APP_SERVER_URL}/events/`, {
                eventType: 'tournament ended',
                eventName: tournamentResponse.data.tournament.name,
            }, { withCredentials: true });
            navigate(`/tournaments/${tournamentId}/end`);
        } catch (error) {
            toast.error('You can`t end a tournament because you are not its creator')
            const { response } = error;
            console.error(error);
        }
    };

    const handleUnjoinTournament = async (tournamentId) => {
        try {
            const updatedUser = await axios.post(`${process.env.REACT_APP_SERVER_URL}/tournaments/unjoin`, {}, { withCredentials: true });
            console.log(`Unjoined tournament with ID: ${tournamentId}`);

            setUser(updatedUser.data);
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tournaments`);

            setTournaments(res.data);
        } catch (error) {
            const { response } = error;
            console.error(error);
        }
    };

    return (
        <section>
            <h2>All Tournaments</h2>
            <div className="tournament-list">
                {tournaments?.map((tournament) => (
                    <TournamentComponent
                        key={tournament._id}
                        tournament={tournament}
                        onJoinTournament={handleJoinTournament}
                        onEndTournament={handleEndTournament}
                        onUnjoinTournament={handleUnjoinTournament}
                    />
                ))}
            </div>
        </section>
    );
};

export default Home;
