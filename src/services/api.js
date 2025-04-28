import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const createRequest = async (endpoint, method = 'GET', data = null) => {
  const config = {
    method,
    url: `${API_URL}${endpoint}`,
    data,
  };

  const response = await axios(config);
  return response.data;
};