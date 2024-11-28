import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return response.data; // This should contain the token
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};
