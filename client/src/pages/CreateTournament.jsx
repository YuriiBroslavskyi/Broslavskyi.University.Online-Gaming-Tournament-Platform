import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const CreateTournament = () => {
    const [tournamentData, setTournamentData] = useState({
        name: '',
        description: '',
        rules: '',
        startDate: '',
        endDate: '',
        prizePool: '',
    });

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const todayDate = getTodayDate();

    const validateDate = (date) => {
        return date >= todayDate ? date : todayDate;
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTournamentData({ ...tournamentData, [name]: value });
    };

    const handleDateBlur = (event) => {
        const { name, value } = event.target;
        const validDate = validateDate(value);
        if (value < todayDate) {
            toast.error('You cannot select a past date. Setting to today\'s date.');
        }
        setTournamentData({ ...tournamentData, [name]: validDate });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validatedStartDate = validateDate(tournamentData.startDate);
        const validatedEndDate = validateDate(tournamentData.endDate);

        if (validatedStartDate !== tournamentData.startDate || validatedEndDate !== tournamentData.endDate) {
            setTournamentData({ ...tournamentData, startDate: validatedStartDate, endDate: validatedEndDate });
            toast.error('Dates have been corrected. Please verify.');
            return;
        }

        try {
            const tournamentResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/tournaments/`, tournamentData, { withCredentials: true });
            console.log('Tournament created:', tournamentResponse.data);

            await axios.post(`${process.env.REACT_APP_SERVER_URL}/events/`, {
                eventType: 'tournament creation',
                eventName: tournamentResponse.data.name,
            }, { withCredentials: true });

            toast.success(`${tournamentResponse.data.name} has been created`);
        } catch (error) {
            const { response } = error;
            if (response && response.status === 400) {
                toast.error(response.data.message);
            } else {
                console.error('Error creating tournament:', error);
            }
        }
    };

    return (
        <div className="form-container">
            <h1>Create Tournament</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={tournamentData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={tournamentData.description}
                        onChange={handleInputChange}
                        rows="4"
                        cols="50"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="rules">Rules:</label>
                    <textarea
                        id="rules"
                        name="rules"
                        value={tournamentData.rules}
                        onChange={handleInputChange}
                        rows="4"
                        cols="50"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={tournamentData.startDate}
                        onChange={handleInputChange}
                        onBlur={handleDateBlur}
                        min={todayDate}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={tournamentData.endDate}
                        onChange={handleInputChange}
                        onBlur={handleDateBlur}
                        min={todayDate}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="prizePool">Prize Pool:</label>
                    <input
                        type="number"
                        id="prizePool"
                        name="prizePool"
                        value={tournamentData.prizePool}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <button type="submit">Create Tournament</button>
                </div>
            </form>
        </div>
    );
};
