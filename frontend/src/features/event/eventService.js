import axios from "axios";

const API_URI = import.meta.env.VITE_API_URI_BOOK;

const getApproved = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };

  const response = await axios.get(API_URI + 'approved', config);
    return response.data;
};

const eventService = {
  getApproved
};

export default eventService;