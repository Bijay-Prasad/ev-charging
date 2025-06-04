import axios from 'axios';

const { VITE_API_URL } = import.meta.env;

const API = axios.create({ baseURL: `${VITE_API_URL}/api` });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);
export const getChargers = () => API.get('/chargers');
export const createCharger = (data) => API.post('/chargers', data);
export const updateCharger = (id, data) => API.put(`/chargers/${id}`, data);
export const deleteCharger = (id) => API.delete(`/chargers/${id}`);