import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import bookingReducer from '../features/booking/bookingSlice'
import eventReducer from '../features/event/eventSlice'


export const store = configureStore({
    reducer:{
        auth:authReducer,
        booking:bookingReducer,
        events:eventReducer,
    }
})