import api from './axios';

const glossaryApi = {
  getGlossary: (params) => api.get('/glossary/', { params }),
};

export default glossaryApi;
