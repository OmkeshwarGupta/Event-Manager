import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Navbar = ({ token, setToken }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear token from localStorage and update state
        localStorage.removeItem('token');
        setToken(null);
        navigate('/');
        toast.success('Logout successful');
    };


    return (
        <nav className="bg-blue-600 p-4 shadow-lg flex justify-between items-center">
            <Link to={"/"}>
            <h1 className="text-white text-lg font-semibold">Event Manager</h1>
            </Link>
            <div className="space-x-4">
                {!token ? (
                    <>
                        <Link className="text-white hover:text-blue-200" to="/login">Login</Link>
                        <Link className="text-white hover:text-blue-200" to="/signup">Signup</Link>
                    </>
                ) : (
                    <>
                        <Link className="text-white hover:text-blue-200" to="/dashboard">Dashboard</Link>
                        <button
                            onClick={handleLogout}
                            className="text-white bg-red-500 hover:bg-red-600 py-1 px-4 rounded transition duration-300"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
