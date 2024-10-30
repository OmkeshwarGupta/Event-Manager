import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // Importing toast correctly

const EventsList = ({ token }) => {
    const [events, setEvents] = useState([]);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/events/event`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add token to the Authorization header
                    },
                });
                console.log('Events:', response.data);
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        if (token) { // Fetch events only if token exists
            fetchEvents();
        }
    }, [token]);



    const handleDelete = async (eventId) => {
        try {
            await axios.delete(`${API_BASE_URL}/events/event/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add token to the Authorization header
                },
            });
            setEvents(events.filter(event => event.id !== eventId)); // Update local state
            toast.success('Event deleted successfully'); // Show success toast
        } catch (error) {
            console.error('Error deleting event:', error);
            toast.error('Error deleting event'); // Show error toast if deletion fails
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Your Events</h2>
            <div className="bg-white shadow-md rounded-lg">
                {events.length === 0 ? ( // Check if there are no events
                    <p className="py-4 text-center text-gray-500">No events found.</p>
                ) : (
                    <table className="min-w-full">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 text-left">Title</th>
                                <th className="py-2 px-4 text-left">Description</th>
                                <th className="py-2 px-4 text-left">Start Time</th>
                                <th className="py-2 px-4 text-left">End Time</th>
                                <th className="py-2 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => (
                                <tr key={event.id} className="border-b hover:bg-gray-100">
                                    <td className="py-2 px-4">{event.title}</td>
                                    <td className="py-2 px-4">{event.description}</td>
                                    <td className="py-2 px-4">{new Date(event.startTime).toLocaleString()}</td>
                                    <td className="py-2 px-4">{new Date(event.endTime).toLocaleString()}</td>
                                    <td className="py-2 px-4 flex space-x-2">
                                        <Link to={`/edit-event/${event.id}`}>
                                            <FaEdit className="text-blue-600 cursor-pointer hover:text-blue-800" />
                                        </Link>
                                        <FaTrash
                                            className="text-red-600 cursor-pointer hover:text-red-800"
                                            onClick={() => handleDelete(event.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default EventsList;
