// bookingService.js

import axios from "axios";

const API_URI = "/api/booking/";

const bookingService = {
  getUserBookings: async (token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(API_URI + "mybookings", config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message || "Failed to fetch user bookings.");
      }
    }
  },
  
};

export default bookingService;
