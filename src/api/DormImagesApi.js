import axios from 'axios';

export const getDormImages = async () => {
  try {
    const response = await axios.get(`/dorm-images`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
