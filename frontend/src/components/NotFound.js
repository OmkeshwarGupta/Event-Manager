import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-9xl font-bold text-blue-600">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mt-4">Oops! Page not found</h2>
            <p className="text-gray-600 mt-2">
                Sorry, the page you are looking for does not exist. 
            </p>
            <Link to="/" className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;
