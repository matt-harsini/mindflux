import axios from "axios";
// https://mindflux.fly.dev/api
// http://localhost:4000/api
export const authFetch = axios.create({
  baseURL: "https://mindflux.fly.dev/api",
});

export const getAuthFetch = axios.create({
  baseURL: "https://mindflux.fly.dev/api",
});
