import api from './axios';

const topicApi = {
  getTopics: (params) => api.get('/topics/', { params }),
  getTopicDetail: (id) => api.get(`/topics/${id}/`),
  getTopicMaterials: (topicId, params) => api.get(`/topics/${topicId}/materials/`, { params }),
};

export default topicApi;
