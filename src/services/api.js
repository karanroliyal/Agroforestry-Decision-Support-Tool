import axios from 'axios';

export const getRecommendations = async (formData) => {
  try {
    const response = await axios.post('/api/recommendations', formData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Network error or server is down. Please try again.');
  }
};
