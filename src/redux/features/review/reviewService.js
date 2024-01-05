import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/client/reviews`;

//Create Review
const createReview = async (reviewData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/`, reviewData, config);

  return response.data;
};

//Check Is reviewAvailable
const isReviewAvailable = async (roomId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}?roomId=${roomId}`, config);

  return response.data;
};

const reviewService = {
  createReview,
  isReviewAvailable,
};

export default reviewService;
