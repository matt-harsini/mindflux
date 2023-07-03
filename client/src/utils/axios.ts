import axios from "axios";

export const authFetch = axios.create({
  baseURL: "https://mindflux.fly.dev/api",
});

export const getAuthFetch = axios.create({
  baseURL: "https://mindflux.fly.dev/api",
});
