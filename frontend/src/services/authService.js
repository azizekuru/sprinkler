import api from './api';
import { API_ENDPOINTS } from '../config/api';

export const authService = {
  // Giriş yap
  login: async (email, password) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });
    return response.data;
  },

  // Kayıt ol
  register: async (userData) => {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  },

  // Çıkış yap
  logout: async (refreshToken) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT, {
      refreshToken,
    });
    return response.data;
  },

  // Token'ları yenile
  refreshTokens: async (refreshToken) => {
    const response = await api.post(API_ENDPOINTS.AUTH.REFRESH_TOKENS, {
      refreshToken,
    });
    return response.data;
  },

  // Şifre sıfırlama linki gönder
  forgotPassword: async (email) => {
    const response = await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      email,
    });
    return response.data;
  },

  // Şifre sıfırla
  resetPassword: async (token, password) => {
    const response = await api.post(
      `${API_ENDPOINTS.AUTH.RESET_PASSWORD}?token=${token}`,
      { password }
    );
    return response.data;
  },

  // Doğrulama emaili gönder
  sendVerificationEmail: async () => {
    const response = await api.post(API_ENDPOINTS.AUTH.SEND_VERIFICATION_EMAIL);
    return response.data;
  },

  // Email doğrula
  verifyEmail: async (token) => {
    const response = await api.post(
      `${API_ENDPOINTS.AUTH.VERIFY_EMAIL}?token=${token}`
    );
    return response.data;
  },
};

