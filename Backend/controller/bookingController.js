const asyncHandler = require('express-async-handler')
const Hall = require('../model/hallModel')
const Booking = require('../model/bookingModel')



// @desc GET  all halls Booked
// @route /api/book   -  GET
// @access all user

const GetBookings = asyncHandler(async(req, res)=>{

    const Bookings_list = await Booking.find()
    res.status(200).json(Bookings_list)
})


// @desc book a hall
// @route /api/book   -  POST
// @access user specific

const bookHall = asyncHandler (async (req, res) =>{
    const { hallId ,event, coordinator, department, date, startTime , endTime } = req.body

    if(!hallId || !date || !startTime || !endTime ||!event || !coordinator || !department){
        res.status(400)
        throw new Error('Please input all data')
    }

    

    hallExists = await Hall.findById(hallId)
    if(!hallExists){
        res.status(400)
        throw new Error('Hall does not exists')
    }

    const New_Booking = await Booking.create({
        userId:req.user.id,
        hallId:hallId,
        event:event,
        coordinator : coordinator,
        department:department,
        date:date,
        startTime : startTime,
        endTime: endTime,

    })

    res.status(201)
    res.json(New_Booking)
})


// @desc EDIT a Booking
// @route /api/book/:Id   -  PUT
// @access user specific

const EditBooking = asyncHandler(async(req, res)=>{
    const booking_data = await Booking.findById(req.params.id)

    // check if the booking exists
    if(!booking_data){
        res.status(400)
        throw new Error('No such Booking found')
    }

    // check whether the user is the owner of the booking 
    if(booking_data.userId.toString() !== req.user.id){
        res.status(401)
        throw new Error('unauthorized access')
    }

    const updated_Booking_data = await Booking.findByIdAndUpdate(req.params.id ,req.body,{new:true})
    res.status(200)
    res.json(updated_Booking_data)

    
})

// @desc DELETE a Booking
// @route /api/book/:Id   -  DELETE
// @access user specific

const DeleteBooking = asyncHandler ( async (req, res) =>{
    const booking_data = await Booking.findById(req.params.id)

    // check if the booking exists
    if(!booking_data){
        res.status(400)
        throw new Error('No such Booking found')
    }

    // check whether the user is the owner of the booking 
    if(booking_data.userId.toString() !== req.user.id){
        res.status(401)
        throw new Error('unauthorized access')
    }

    await booking_data.deleteOne()

    res.status(200)
    res.json({
        id:req.params.id
    })
})



module.exports ={
    bookHall,
    GetBookings,
    EditBooking,
    DeleteBooking
    }