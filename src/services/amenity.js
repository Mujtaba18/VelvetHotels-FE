import Client from "./api";

const API_URL = '/amenities';

export const addAmenity = async (formData) => {
  try {
      const response = await Client.post(API_URL, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
  } catch (error) {
      throw new Error(error.response.data.message || 'Error adding amenity');
  }
};

export const getAmenities = async () => {
  try {
    const response = await Client.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error retrieving amenities');
  }
}