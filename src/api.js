import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vb-react-exam.netlify.app/api/form',
});

export async function getFormData() {
  const response = await api.get('/');
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
}

export async function postFormData(data) {
  const response = await api.post('/', data);
  if (response.data) {
    return response.data;
  }
}
