import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'https://id.kiotviet.vn',
  header: {
    'content-type': 'application/x-www-form-urlencoded'
  },
})



// interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
  // config.TOKEN = response.data.access_token
  //console.log(response)
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default axiosClient;