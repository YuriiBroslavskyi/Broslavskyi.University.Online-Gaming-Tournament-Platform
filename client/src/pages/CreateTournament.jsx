import React, { useState } from 'react';
import axios from 'axios';

export const CreateTournament = () => {
    const [tournamentData, setTournamentData] = useState({
        name: '',
        description: '',
        rules: '',
        startDate: '',
        endDate: '',
        prizePool: '',
    });
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTournamentData({ ...tournamentData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/tournaments/', tournamentData, { withCredentials: true });
            console.log('Tournament created:', response.data);
        } catch (error) {
            console.error('Error creating tournament:', error);
        }
    };

    return (
        <div className="form-container">
            <h1>Create Tournament</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={tournamentData.name} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={tournamentData.description} onChange={handleInputChange} rows="4" cols="50" required />
                </div>

                <div className="form-group">
                    <label htmlFor="rules">Rules:</label>
                    <textarea id="rules" name="rules" value={tournamentData.rules} onChange={handleInputChange} rows="4" cols="50" required />
                </div>

                <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input type="date" id="startDate" name="startDate" value={tournamentData.startDate} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="endDate">End Date:</label>
                    <input type="date" id="endDate" name="endDate" value={tournamentData.endDate} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="prizePool">Prize Pool:</label>
                    <input type="number" id="prizePool" name="prizePool" value={tournamentData.prizePool} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                    <button type="submit">Create Tournament</button>
                </div>
            </form>
        </div>
    );
};
