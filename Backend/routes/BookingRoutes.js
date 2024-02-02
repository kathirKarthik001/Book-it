// bookingRoutes.js

const express = require('express');
const bookingController = require('../controller/bookingController');

const router = express.Router();

// Route to create a new booking using the booking controller
router.post('/api/bookings', bookingController.createBooking);

module.exports = router;
