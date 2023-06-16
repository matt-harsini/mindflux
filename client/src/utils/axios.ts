import axios from "axios";

export const authFetch = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const getAuthFetch = axios.create({
  baseURL: "http://localhost:4000/api",
});
