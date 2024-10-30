import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigator = useNavigate();

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        try {
            await axios.post(`${API_BASE_URL}/auth/register`, formData);
            toast.success('Signup successful');
            navigator('/login');
        } catch (error) {
            if (error.response) {
                // Show specific error from the server response if available
                toast.error(error.response.data.error || 'Signup failed');
            } else {
                toast.error('Signup failed');
            }
            console.error('Signup error', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Signup</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
                >
                    Signup
                </button>
            </form>
        </div>
    );
};

export default Signup;
