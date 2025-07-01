import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `https://globira-server.vercel.app`,
  withCredentials: true,
});
const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
