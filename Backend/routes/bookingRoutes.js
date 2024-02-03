const express = require('express')
const router = express.Router()

const {GetBookings , bookHall , EditBooking ,DeleteBooking , PendingBookings , Decision} = require('../controller/bookingController')

// authorization midlleware 
const {protect} = require('../middleware/authMiddleware')  

//conflict middleware
const { checkForConflicts } = require('../middleware/conflictMiddleware')

// admin midlleware 
const { adminProtect } = require('../middleware/adminMiddleware')

router.route('/').get(protect,GetBookings ).post(protect , checkForConflicts ,bookHall )

router.route('/:id').put(protect , checkForConflicts ,EditBooking ).delete(protect ,DeleteBooking )

router.route('/pending').get(protect,adminProtect,PendingBookings )
router.route('/pending/:id').patch(protect,adminProtect, Decision)
module.exports = router