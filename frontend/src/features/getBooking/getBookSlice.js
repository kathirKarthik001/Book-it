// userBookingSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bookingService from './getBookService'; // Adjust import path

const initialState = {
  userBookings: [],
  loading: false,
  isSuccess: false,
  error: null,
};

// Get User Bookings
export const fetchUserBookings = createAsyncThunk(
  'booking/fetchUserBookings',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingService.getUserBookings(token); // Use bookingService
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const userBookingSlice = createSlice({
  name: 'userBooking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.userBookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    }
});

export default userBookingSlice.reducer;
