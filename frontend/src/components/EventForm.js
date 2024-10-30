import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const EventForm = ({ onEventCreated, onCancel }) => {
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        startTime: '',
        endTime: '',
    });

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { startTime, endTime } = eventData;

        // Validate end time is greater than start time
        if (new Date(endTime) <= new Date(startTime)) {
            toast.error("End time must be later than start time");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/events/event`, eventData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token to the Authorization header
                },
            });
            onEventCreated(); // Call this function after successful creation
            setEventData({
                title: '',
                description: '',
                startTime: '',
                endTime: '',
            });
            if (response.status === 201) {
                toast.success('Event created successfully');
            }
        } catch (error) {
            console.error('Error creating event:', error.response?.data || error.message);
            toast.error("Event creation failed");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-bold text-blue-600">Create Event</h2>
            <input
                type="text"
                name="title"
                placeholder="Event Title"
                onChange={handleChange}
                value={eventData.title}
                className="w-full p-2 border border-gray-300 rounded"
                required
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                onChange={handleChange}
                value={eventData.description}
                className="w-full p-2 border border-gray-300 rounded"
                required
            />
            <label className="block mt-4">Start Time:</label>
            <input
                type="datetime-local"
                name="startTime"
                onChange={handleChange}
                value={eventData.startTime}
                className="w-full p-2 border border-gray-300 rounded"
                required
            />
            <label className="block mt-4">End Time:</label>
            <input
                type="datetime-local"
                name="endTime"
                onChange={handleChange}
                value={eventData.endTime}
                className="w-full p-2 border border-gray-300 rounded"
                required
            />
            <div className="flex gap-2 mt-4">
                <button
                    type="submit"
                    className="w-[20%] bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
                >
                    Create Event
                </button>
                <button
                    type="button"
                    onClick={onCancel} // Trigger the onCancel function passed as prop
                    className="w-[20%] bg-gray-300 text-black py-2 rounded hover:bg-gray-400 transition duration-300"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EventForm;
