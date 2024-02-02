const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model, assuming you have a User model
        required: [true, 'Please provide a user ID'],
        unique: true
    },
    hallId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hall', // Reference to the Hall model
        required: [true, 'Please provide a hall ID'],
        unique: true
    },
    date: {
        type: Date,
        required: [true, 'Please provide a booking date'],
    },
    startTime: {
        type: String,
        required: [true, 'Please provide a start time'],
    },
    endTime: {
        type: String,
        required: [true, 'Please provide an end time'],
    },
});

module.exports = mongoose.model('Booking', bookingSchema);
