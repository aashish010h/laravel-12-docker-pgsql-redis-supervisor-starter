import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "",
  withCredentials: true, // send cookies
  headers: {
    Accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      // redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
