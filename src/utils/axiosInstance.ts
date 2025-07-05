import axios from "axios";

// Create custom axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Token refresh control flags
let isRefreshing = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let failedQueue: any[] = [];

// Handle queued requests after token is refreshed
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// ✅ REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    // Add access token to each request
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (res) => res, // Success response → pass through
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 (Unauthorized) and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return axiosInstance(originalRequest); // Retry original request
        });
      }

      // Start token refresh process
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        // Send request to refresh token
        const res = await axios.post(
          "http://localhost:5000/api/refresh-token",
          {
            refreshToken,
          }
        );
        const { accessToken } = res.data as { accessToken: string };

        // Save new access token
        localStorage.setItem("accessToken", accessToken);

        // Set new token for future requests
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        // Process all failed requests in the queue
        processQueue(null, accessToken);

        // Retry the original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        // Token refresh failed → log out user
        processQueue(err, null);
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // Other errors → just reject
    return Promise.reject(error);
  }
);

export default axiosInstance;
