import axios from "axios";

const BASE_URL = "https://toapi-production-7647.up.railway.app/";

export const Api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
