import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const EventUpdateForm = ({ token }) => {
    const { eventId } = useParams(); // Get the event ID from the URL
    console.log('Event ID:', eventId);
    const navigate = useNavigate();
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        startTime: '',
        endTime: '',
    });
    const [error, setError] = useState('');


    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/events/event/${eventId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Event data:', response.data);
                setEventData(response.data);
            } catch (err) {
                setError('Error fetching event data. Please check the event ID and try again.');
                console.error(err);
            }
        };

        fetchEvent();
    }, [eventId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { startTime, endTime } = eventData;

        // Validate end time is greater than start time
        if (new Date(endTime) <= new Date(startTime)) {
            setError("End time must be later than start time");
            toast.error("End time must be later than start time");
            return;
        }

        try {
            await axios.put(`${API_BASE_URL}/events/event/${eventId}`, eventData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/dashboard'); // Navigate to the events list after update
            toast.success('Event updated successfully');
        } catch (err) {
            setError('Error updating event. Please try again.');
            toast.error('Event update failed');
            console.error(err);
        }
    };

    const handleCancel = () => {
        navigate('/dashboard'); // Navigate back to events list without saving changes
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Update Event</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={eventData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={eventData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Start Time</label>
                    <input
                        type="datetime-local"
                        name="startTime"
                        value={eventData.startTime.split('.')[0]} // Remove milliseconds
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">End Time</label>
                    <input
                        type="datetime-local"
                        name="endTime"
                        value={eventData.endTime.split('.')[0]} // Remove milliseconds
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border rounded w-full"
                    />
                </div>
                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                    >
                        Update Event
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-300"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EventUpdateForm;
