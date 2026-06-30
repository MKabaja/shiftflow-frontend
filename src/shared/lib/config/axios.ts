import axios from 'axios';
import { config } from './config.ts';

export const apiClient = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});
