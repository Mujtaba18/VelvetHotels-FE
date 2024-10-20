import Client from "./api";

const API_URL = '/amenities';

export const addAmenity = async (amenity) => {
  console.log('Received body:', amenity);
  try {
    const reposne = await Client.post(API_URL, amenity);
    return reposne.data;
  } catch (error) {
    throw new Error(error.reposne.data.message || 'Error adding amenity')
  }
};

export const getAmenities = async () => {
  try {
    const response = await Client.get(API_URL);
    return reposne.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error retrieving amenities');
  }
}