import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import Home from './components/Home';
import EventUpdateForm from './components/EventUpdateForm';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || null); // Initialize from localStorage

    // Update localStorage whenever token changes
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token'); // Clear token from localStorage on logout
        }
    }, [token]);

    return (
      
        <Router>
            <Navbar token={token} setToken={setToken} />
            <Routes>
                <Route path="/"element={token ? <Dashboard /> : <Home/>} />
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={token ? <Dashboard /> : <Login setToken={setToken} />} />
                <Route path="/edit-event/:eventId" element={<EventUpdateForm token={token} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
