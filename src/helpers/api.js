import axios from 'axios';

export default axios.create({
  baseURL: process.env.YKBAPI || 'http://localhost:8080',
  headers: {
    Authorization: `bearer ${localStorage.getItem('token')}`,
    'content-type': 'application/json',
  }
});