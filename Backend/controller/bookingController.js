// bookingController.js

const Booking = require('../model/bookingModel');
const mongoose = require('mongoose');

const createBooking = async (req, res) => {
    try {
        const { userId, hallId, date, startTime, endTime } = req.body;

        // Validate if userId and hallId are valid ObjectId types
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(hallId)) {
            return res.status(400).json({ error: 'Invalid userId or hallId' });
        }

        // Create a new booking
        const newBooking = await Booking.create({
            userId,
            hallId,
            date,
            startTime,
            endTime,
        });

        // Schedule the deletion of the booking after the end time
        const endDateTime = new Date(`${date}T${endTime}`);
        const currentTime = new Date();

        const deletionDelay = endDateTime - currentTime;

        if (deletionDelay > 0) {
            setTimeout(async () => {
                await Booking.findByIdAndDelete(newBooking._id);
                console.log(`Booking ${newBooking._id} automatically deleted after reaching end time.`);
            }, deletionDelay);
        }

        res.status(201).json(newBooking);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { createBooking };
