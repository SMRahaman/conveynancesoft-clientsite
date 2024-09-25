import axios from "axios";
export const axiosPublic = axios.create({
  baseURL: "https://conveynance-serversite.vercel.app/api",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
