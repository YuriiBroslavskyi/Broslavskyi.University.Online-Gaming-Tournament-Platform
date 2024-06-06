import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const LatestEvents = () => {
    const [latestEvents, setLatestEvents] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/events/latest`)
            .then(res => {
                setLatestEvents(res.data);
            })
            .catch(error => {
                console.error('Error fetching latest events:', error);
            });
    }, []);

    return (
        <div>
            <h1>Latest Events</h1>
            <ul className="latest-events-list">
                {latestEvents.map(event => (
                    <li key={event._id} className="event-item">
                        {event.eventType === 'tournament creation' && (
                            <>
                                <p>{`Tournament "${event.eventName}" has been created by`}</p>
                                <div className="user-info">
                                    <img src={event.userId?.picture} alt="user photo" className="user-avatar" />
                                    <p className="user-name">
                                        {event.userId.displayName}
                                    </p>
                                </div>
                                <p>{`On ${new Date(event.timestamp).toLocaleString('en-GB')}`}</p>
                            </>
                        )}
                        {event.eventType === 'league change' && (
                            <>
                                <div className="user-info">
                                    <img src={event.userId?.picture} alt="user photo" className="user-avatar" />
                                    <p>{`${event.userId.displayName} changed its league to ${event.leagueName}`}</p>
                                </div>
                                <p>{`On ${new Date(event.timestamp).toLocaleString('en-GB')}`}</p>
                            </>
                        )}
                        {event.eventType === 'tournament ended' && (
                            <>
                                <div className="user-info">
                                    <p>{`Tournament ${event.eventName} has ended`}</p>
                                </div>
                                <p>{`On ${new Date(event.timestamp).toLocaleString('en-GB')}`}</p>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};
