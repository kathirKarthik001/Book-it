const express = require('express')
const router = express.Router()

const {GetBookings , bookHall , EditBooking ,DeleteBooking} = require('../controller/bookingController')

// authorization midlleware 
const {protect} = require('../middleware/authMiddleware')  


router.route('/').get(protect ,GetBookings ).post(protect ,bookHall )

router.route('/:id').put(protect ,EditBooking ).delete(protect ,DeleteBooking )



module.exports = router