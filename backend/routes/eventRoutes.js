
const express = require('express');
const { createEvent, getAllEvents, updateEvent, deleteEvent,getEvent } = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/event', authMiddleware, createEvent);
router.get('/event/:id', authMiddleware, getEvent);
router.get('/event', authMiddleware, getAllEvents);
router.put('/event/:id', authMiddleware, updateEvent);
router.delete('/event/:id', authMiddleware, deleteEvent);

module.exports = router;
