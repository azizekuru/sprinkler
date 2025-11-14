import axios from 'axios';
import { API_BASE_URL } from '../config/api';

// Axios instance oluştur
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - her istekte token'ı ekle
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - token süresi dolmuşsa refresh token ile yenile
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 hatası alındıysa ve daha önce retry yapılmadıysa
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          // Refresh token yoksa logout yap
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // Refresh token ile yeni access token al (axios kullan, çünkü token interceptor'dan geçmemeli)
        const response = await axios.post(`${API_BASE_URL}/auth/refresh-tokens`, {
          refreshToken,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Backend direkt tokens objesi döndürüyor { access: {...}, refresh: {...} }
        const { access, refresh } = response.data;
        localStorage.setItem('accessToken', access.token);
        localStorage.setItem('refreshToken', refresh.token);

        // Orijinal isteği yeni token ile tekrar dene
        originalRequest.headers.Authorization = `Bearer ${access.token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token da geçersizse logout yap
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

