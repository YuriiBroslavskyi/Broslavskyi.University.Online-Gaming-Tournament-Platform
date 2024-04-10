import { useState } from 'react';
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
        //console.log(name, value);
        setTournamentData({ ...tournamentData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/tournaments/', tournamentData, {withCredentials: true})
            console.log('Tournament created:', response.data);
            // Optionally, you can redirect the user to another page after successful creation
        } catch (error) {
            console.error('Error creating tournament:', error);
        }
    };

    return (
        <div>
            <h1>Create Tournament</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={tournamentData.name} onChange={handleInputChange} required /><br/><br/>

                <label htmlFor="description">Description:</label><br/>
                <textarea id="description" name="description" value={tournamentData.description} onChange={handleInputChange} rows="4" cols="50" required /><br/><br/>

                <label htmlFor="rules">Rules:</label><br/>
                <textarea id="rules" name="rules" value={tournamentData.rules} onChange={handleInputChange} rows="4" cols="50" required /><br/><br/>

                <label htmlFor="startDate">Start Date:</label>
                <input type="date" id="startDate" name="startDate" value={tournamentData.startDate} onChange={handleInputChange} required /><br/><br/>

                <label htmlFor="endDate">End Date:</label>
                <input type="date" id="endDate" name="endDate" value={tournamentData.endDate} onChange={handleInputChange} required /><br/><br/>

                <label htmlFor="prizePool">Prize Pool:</label>
                <input type="number" id="prizePool" name="prizePool" value={tournamentData.prizePool} onChange={handleInputChange} required /><br/><br/>

                <button type="submit">Create Tournament</button>
            </form>
        </div>
    );
};
