import axios from 'axios';

// const BASE_URL = "http://localhost:3001/api/flats";
const BASE_URL = "http://localhost:51258/api/flats";

export const fetchFlats = async (params) => {
  const { data } = await axios(BASE_URL, {
    params
  });
  return data;
}

export const fetchFlatById = async (id) => {
  const { data } = await axios(`${BASE_URL}/${id}`);
  return data;
}

export const fetchAvailableFlatFilters = async () => {
  const { data } = await axios(`${BASE_URL}/available-filters`);
  return data;
}