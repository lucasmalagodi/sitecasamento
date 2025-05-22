const API_URLS = {
  development: 'http://localhost:3000/api',
  production: 'https://paulaelucas.site:3000/api'
};

export const getApiUrl = () => {
  const env = import.meta.env.MODE || 'development';
  return API_URLS[env];
}; 