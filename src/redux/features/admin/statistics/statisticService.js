import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/admin/statistics`;

const getStatistic = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}`, config);

  return response.data;
};

const reviewService = {
  getStatistic,
};

export default reviewService;
