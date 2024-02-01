const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique:true
    },
    capacity: {
        type: Number,
        required: [true, 'Please add a capacity'],
    },
    location: {
        type: String,
        required: [true, 'Please add a location'],
    },
});



module.exports = mongoose.model('Hall', hallSchema);
