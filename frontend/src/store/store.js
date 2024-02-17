import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import bookingReducer from '../features/bookings/bookingSlice'
import eventReducer from '../features/event/eventSlice'
import userBookingReducer from '../features/mybookings/myBookingsSlice'

export const store = configureStore({
    reducer:{
        auth:authReducer,
        booking:bookingReducer,
        events:eventReducer,
        userBooking:userBookingReducer ,
    }
})