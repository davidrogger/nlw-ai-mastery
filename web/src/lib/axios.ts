import axios from 'axios';
import { getEnvVariables } from '@/services/handleENV';

const { API_URL, API_PORT } = getEnvVariables();

const baseURL = `${API_URL}:${API_PORT}`;

export const api = axios.create({
  baseURL,
});
