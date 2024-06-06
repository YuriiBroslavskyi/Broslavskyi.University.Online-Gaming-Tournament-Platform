import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const CreateFeedback = () => {
    const [feedbackData, setFeedbackData] = useState({
        name: '',
        description: '',
    });

    const [selectedFeedbackTopic, setSelectedFeedbackTopic] = useState('');

    const handleFeedbackTopicChange = (event) => {
        setSelectedFeedbackTopic(event.target.value);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFeedbackData({ ...feedbackData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const feedbackResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/feedbacks/`, {
                ...feedbackData,
                topic: selectedFeedbackTopic
            }, { withCredentials: true });
            console.log('Feedback created:', feedbackResponse.data);

            setFeedbackData({
                name: '',
                description: ''
            });
            setSelectedFeedbackTopic('');

            toast(`Thanks for leaving the feedback!`);
        } catch (error) {
            console.error('Error creating feedback:', error);
        }
    };

    return (
        <div className="form-container">
            <h1>Create Feedback</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={feedbackData.name} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="topic">Topic:</label>
                    <select className="select-topic" value={selectedFeedbackTopic} onChange={handleFeedbackTopicChange} required>
                        <option value="">Select a topic</option>
                        <option value="league-issue">League issue</option>
                        <option value="tournament-issue">Tournament issue</option>
                        <option value="profile-issue">Profile issue</option>
                        <option value="feedback-mechanism-issue">Feedback mechanism issue</option>
                        <option value="notification-issue">Notification issue</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={feedbackData.description} onChange={handleInputChange} rows="4" cols="50" required />
                </div>

                <div className="form-group">
                    <button type="submit">Submit Feedback</button>
                </div>
            </form>
        </div>
    );
};
