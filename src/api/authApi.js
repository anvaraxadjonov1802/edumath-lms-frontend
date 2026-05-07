import api from './axios';

const authApi = {
  register: (data) => api.post('/auth/register/', data),
  verifyEmail: (data) => api.post('/auth/verify-email/', data),
  resendCode: (data) => api.post('/auth/resend-code/', data),
  login: (data) => api.post('/auth/login/', data),
  getProfile: () => api.get('/auth/profile/'),
};

export default authApi;
