import axios from "axios";
import { use } from "react";
import { AuthContext } from "../Auth/AuthProvider";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxios = () => {
  const { user } = use(AuthContext);
  const token = user?.accessToken;

  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  // axiosInstance.interceptors.response.use(
  //   (response) => response?.data,
  //   (error) => Promise.reject(error)
  // );
  return axiosInstance;
};

export default useAxios;
