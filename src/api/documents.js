import client from './client';

export const uploadDocument = async (file, selfie) => {
  const formData = new FormData();
  formData.append('file', file);
  if (selfie) {
    formData.append('selfie', selfie);
  }
  const response = await client.post('/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getDocument = async (id) => {
  const response = await client.get(`/documents/${id}`);
  return response.data;
};

export const getResults = async (id) => {
  const response = await client.get(`/documents/${id}/results`);
  return response.data;
};

export const listDocuments = async (page = 0, size = 10) => {
  const response = await client.get('/documents', {
    params: { page, size },
  });
  return response.data;
};
