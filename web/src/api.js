import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8081',
});

const loadChannels = () => {
  return instance.get('/');
}

const importList = (file) => {
  const data = new FormData();
  data.append('list', file);
  return instance.post('/import', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  )
}

const exportList = (data) => {
  return instance.post('/export', data, {
    responseType: 'blob',
});
};

export default {
  loadChannels,
  importList,
  exportList,
}