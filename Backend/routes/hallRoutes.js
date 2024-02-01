const express = require('express')
const router = express.Router()

const { getHalls ,createHall ,updateHall ,deleteHall } = require('../controller/hallController')

// authorization midlleware 
const {protect} = require('../middleware/authMiddleware')  

// admin midlleware 
const { adminProtect } = require('../middleware/adminMiddleware')



router.route('/').get(protect , adminProtect, getHalls).post(protect ,adminProtect, createHall)

router.route('/:id').put(protect ,adminProtect, updateHall).delete(protect ,adminProtect, deleteHall)



module.exports = router