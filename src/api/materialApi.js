import api from './axios';

export const getTopicMaterials = async (topicId, type = '') => {
  const params = {};

  if (type) {
    params.type = type;
  }

  const response = await api.get(`/topics/${topicId}/materials/`, {
    params,
  });

  return response.data;
};