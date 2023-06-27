import axios from "axios";

export const authFetch = axios.create({
  baseURL: "https://mindflux-api.onrender.com/api",
});

export const getAuthFetch = axios.create({
  baseURL: "https://mindflux-api.onrender.com/api",
});
