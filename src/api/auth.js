import client from './client';

export const loginApi = async (email, password) => {
  const response = await client.post('/auth/login', { email, password });
  return response.data;
};

export const registerApi = async (email, password) => {
  const response = await client.post('/auth/register', { email, password });
  return response.data;
};
