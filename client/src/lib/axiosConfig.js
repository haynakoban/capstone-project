import axios from 'axios';

export const SERVER_URL = 'http://localhost:5000' || process.env.SERVER_URL;

export default axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});
