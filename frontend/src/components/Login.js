import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import toast from 'react-hot-toast';


const Login = ({ setToken }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
            console.log('Login response:', response.data);
            setToken(response.data.token); // Store the token
            navigate('/dashboard'); // Redirect to the dashboard
            localStorage.setItem('token', response.data.token);
            toast.success('Login successful');
           
        } catch (error) {
            console.error('Login error', error.response.data);
            toast.error('Login failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Login</h2>
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
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
