import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/admin/bookings`;

const allBookings = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}`, config);

  return response.data;
};

const bookingDetails = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${id}`, config);

  return response.data;
};

const deleteBooking = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${id}`, config);

  return response.data;
};

const bookingService = { allBookings, bookingDetails, deleteBooking };

export default bookingService;
