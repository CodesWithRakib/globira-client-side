import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `https://backend-eta-five-56.vercel.app`,
  withCredentials: true,
});
const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
