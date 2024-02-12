const asyncHandler = require('express-async-handler')
const Hall = require('../model/hallModel')
const Booking = require('../model/bookingModel')
const nodemailer = require('nodemailer');


// @desc GET  all halls Booked
// @route /api/book   -  GET
// @access all user

const GetBookings = asyncHandler(async(req, res)=>{
    const Bookings_list = await Booking.find()
    res.status(200).json(Bookings_list)
})

// @desc GET  all approved Bookings
// @route /api/booking/approved   -  GET
// @access all users

const GetBookings_Approved = asyncHandler(async(req, res)=>{
    const Bookings_list = await Booking.find({status:'approved'})

    // Check if any pending bookings were found
    if (Bookings_list.length === 0) {
        res.status(400);
        throw new Error('No approved bookings found');
      }

    res.status(200).json(Bookings_list)
})


// @desc GET  all my Bookings
// @route /api/booking/mybookings   -  GET
// @access all users

const GetBookings_of_User = asyncHandler(async(req, res)=>{
    const Bookings_list = await Booking.find({userId:req.user._id})

    // Check if any pending bookings were found
    if (Bookings_list.length === 0) {
        res.status(400);
        throw new Error('No bookings found');
      }

    res.status(200).json(Bookings_list)
})


// @desc book a hall
// @route /api/booking   -  POST
// @access user specific

const bookHall = asyncHandler (async (req, res) =>{
    const { hallId ,event, coordinator, department,  startTime , endTime } = req.body

    if(!hallId || !startTime || !endTime ||!event || !coordinator || !department){
        res.status(400)
        throw new Error('Please input all data')
    }

    

    hall = await Hall.findById(hallId)
    if(!hall){
        res.status(400)
        throw new Error('Hall does not exists')
    }

    const venue = hall.name
    

    const New_Booking = await Booking.create({
        userId:req.user.id,
        hallId:hallId,
        venue:venue,
        event:event,
        coordinator : coordinator,
        department:department,
        startTime : startTime,
        endTime: endTime,
    })

    res.status(201)
    res.json(New_Booking)
})


// @desc EDIT a Booking
// @route /api/booking/:Id   -  PUT
// @access user specific

const EditBooking = asyncHandler(async(req, res)=>{
    const booking_data = await Booking.findById(req.params.id)

    // check if the booking exists
    if(!booking_data){
        res.status(400)
        throw new Error('No such Booking found')
    }

    if(booking_data.status ==="approved" || booking_data.status ==="finished"||booking_data.status ==="rejected"){
        res.status(401)
        throw new Error('Can\'t edit this booking anymore ')
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
// @route /api/booking/:Id   -  DELETE
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


// @desc GET all pending  Bookings
// @route /api/booking/pending   -  GET
// @access only admin

const PendingBookings = asyncHandler(async (req, res) => {
    const booking_data = await Booking.find({ status: 'pending' });
  
    // Check if any pending bookings were found
    if (booking_data.length === 0) {
      res.status(400);
      throw new Error('No pending bookings yet');
    }

    sendEmail('kathirkarthik001@gmail,com','rame', 'Raam Prasath is a Goodu boy');
  
    res.status(200);
    res.json(booking_data);
  });

  
// @desc PATCH all pending  Bookings
// @route /api/booking/pending/:id   -  PATCH
// @access only admin

const Decision = asyncHandler(async (req, res) => {

    const { status } = req.body
    
    const booking_data = await Booking.findById(req.params.id);

    if(!booking_data){
      res.status(400);
      throw new Error('Booking not found');
    }

    const updated_Booking_data = await Booking.findByIdAndUpdate(req.params.id ,req.body,{new:true})
    
    res.status(200);
    res.json(updated_Booking_data);
  });



module.exports ={
    bookHall,
    GetBookings,
    EditBooking,
    DeleteBooking,

    GetBookings_Approved,
    GetBookings_of_User,    

    PendingBookings,
    Decision 
}




// mailing

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.net",
    port: 465,
    secure: true,
    auth: {
      user: "bookit.kasc@gmail.com",
      pass: "Bookit@naveen",
    },
  });

  const mailOptions = await transporter.sendMail({
    from: {
        name:'Book it',
        address:'bookit.kasc@gmail.com '
    },
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });




