import axios from "axios";

// https://mindflux-api.onrender.com/api
// http://localhost:4000/api

export const authFetch = axios.create({
  baseURL: "https://mindflux-api.onrender.com/api",
});

export const getAuthFetch = axios.create({
  baseURL: "https://mindflux-api.onrender.com/api",
});
