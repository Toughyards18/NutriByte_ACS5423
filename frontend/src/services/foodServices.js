import axios from "axios";

export const getAll = async () => {
  const { data } = await axios.get("/api/foods");
  return data;
};

export const search = async (searchTerm) => {
  const { data } = await axios.get("/api/foods/search/" + searchTerm);
  return data;
};

export const searchFoods = async (query) => {
  const res = await axios.get(`/api/foods/search?q=${query}`);
  return res.data;
};
