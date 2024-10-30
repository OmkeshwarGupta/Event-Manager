import React, { useState, useEffect } from 'react';
import EventForm from './EventForm';
import EventsList from './EventsList';

const Dashboard = () => {
    const [isCreatingEvent, setIsCreatingEvent] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Retrieve token from localStorage and set it to state
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    const handleCreateEventClick = () => {
        setIsCreatingEvent(true);
    };

    const handleEventCreated = () => {
        setIsCreatingEvent(false);
    };

    const handleCancel = () => {
        setIsCreatingEvent(false);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>

            {isCreatingEvent ? (
                <EventForm onEventCreated={handleEventCreated} onCancel={handleCancel} />
            ) : (
                <>
                    <button
                        onClick={handleCreateEventClick}
                        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                    >
                        Create New Event
                    </button>
                    <EventsList token={token} /> {/* Pass the token as a prop */}
                </>
            )}
        </div>
    );
};

export default Dashboard;
