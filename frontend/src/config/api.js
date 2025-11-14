// API Base URL yapılandırması
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/v1';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKENS: '/auth/refresh-tokens',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    SEND_VERIFICATION_EMAIL: '/auth/send-verification-email',
    VERIFY_EMAIL: '/auth/verify-email',
  },
  USERS: {
    GET_ME: '/users/me',
    UPDATE_ME: '/users/me',
    DELETE_ME: '/users/me',
    GET_ALL: '/users',
    GET_BY_ID: (id) => `/users/${id}`,
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
  },
};

