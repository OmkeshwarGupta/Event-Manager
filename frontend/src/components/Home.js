import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center bg-white p-10 rounded-lg shadow-lg max-w-md">
                <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome to Our Event Platform</h1>
                <p className="text-gray-700 mb-6">Manage your events and stay organized effortlessly!</p>
                <div className="flex justify-center space-x-4">
                    <Link to="/login">
                        <button className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition duration-300">
                            Login
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button className="bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-700 transition duration-300">
                            Signup
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
