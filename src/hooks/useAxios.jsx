import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `https://backend-eta-five-56.vercel.app`,
  // baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true,
});
const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
