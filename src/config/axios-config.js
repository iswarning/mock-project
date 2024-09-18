import axios from "axios";

export const BASE_URL = process.env.VITE_BASE_URL;

// Tạo một instance Axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// Đón chặn Request
axiosInstance.interceptors.request.use(
  (config) => {
    // Check hệ thống có access_token hay không và cập nhật Authorization header nếu có
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      config.headers.Authorization = "Bearer" + " " + access_token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Đón chặn Response
axiosInstance.interceptors.response.use(
  (response) => {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    return response;
  },
  async (error) => {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger    if (error.response && error.response.status === 401) {
      try {
        // Gọi API refresh token với phương thức GET, kèm theo token cũ trong header
        const refresh_token = localStorage.getItem("refresh_token");
        const { data } = await axios.get(BASE_URL + "/api/refresh-token", {
          headers: {
            Authorization: "Bearer" + " " + refresh_token,
          },
        });
        // Lưu access-token mới vào localStorage
        localStorage.setItem("access_token", data.access_token);
        // Cập nhật lại token mới vào headers và gửi lại request ban đầu
        error.config.headers["Authorization"] =
          "Bearer" + " " + data.access_token;
        // Gọi lại API ban đầu này với axiosInstance để thực thi
        return axiosInstance(error.config);
    } catch (err) {
        return Promise.reject(err);
      }
    }
);

export default axiosInstance;