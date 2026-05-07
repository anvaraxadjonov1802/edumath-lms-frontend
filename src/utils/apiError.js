export const getApiErrorMessage = (error, fallback = 'Xatolik yuz berdi') => {
  const data = error?.response?.data || error;

  if (!data) return fallback;
  if (typeof data === 'string') return data;
  if (Array.isArray(data)) return data.join(' ');
  if (data.detail) return Array.isArray(data.detail) ? data.detail.join(' ') : data.detail;
  if (data.non_field_errors) {
    return Array.isArray(data.non_field_errors) ? data.non_field_errors.join(' ') : data.non_field_errors;
  }

  const firstField = Object.keys(data)[0];
  if (firstField) {
    const value = data[firstField];
    if (Array.isArray(value)) return value.join(' ');
    if (typeof value === 'string') return value;
  }

  return fallback;
};

export const getApiFieldErrors = (error) => {
  const data = error?.response?.data || error;
  return data && typeof data === 'object' && !Array.isArray(data) ? data : {};
};
