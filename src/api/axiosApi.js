import axios from "axios";
import Cookies from "js-cookie";
// import { useSelector } from "react-redux";

// const { access_token } = useSelector((state) => state.auth.access_token)
const axiosApi = axios.create({
  baseURL: '/api/',
  header: {
    // 'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    Retailer: 'bobebedn',
    Cookie: 'ss-id=ns59baG9BIvQIgCa1qZa; ss-pid=g4B2KDRktO99NM5vPHru'
  },
})
axiosApi.interceptors.request.use(function (config) {
  // Lấy token từ localStorage hoặc bất kỳ nơi nào bạn lưu trữ nó
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});


export default axiosApi;