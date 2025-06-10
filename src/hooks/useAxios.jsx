import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
