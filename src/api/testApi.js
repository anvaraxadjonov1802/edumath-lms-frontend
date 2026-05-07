import api from './axios';

const testApi = {
  getQuestions: (topicId) => api.get(`/topics/${topicId}/questions/`),
  submitTest: (topicId, data) => api.post(`/topics/${topicId}/submit-test/`, data),
  getMyResults: (params) => api.get('/my-results/', { params }),
};

export default testApi;
