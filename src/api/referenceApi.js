import api from './axios';

const referenceApi = {
  getReferences: (params) => api.get('/references/', { params }),
};

export default referenceApi;
