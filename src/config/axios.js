import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_SERVER_URL;

export const axiosPublicInstance = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
});

export const axiosPrivateInstance = (token) => {
  return axios.create({
    baseURL: `${BASE_URL}/api/v1`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
