import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
const useAxios = () => {
  // axiosInstance.interceptors.request.use((config) => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  //   return config;
  // });
  return axiosInstance;
};

export default useAxios;
