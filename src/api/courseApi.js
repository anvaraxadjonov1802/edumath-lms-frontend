import api from './axios';

const courseApi = {
  getCourses: (params) => api.get('/courses/', { params }),
  getCourseDetail: (slug) => api.get(`/courses/${slug}/`),
};

export default courseApi;
