// src/api/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:1337/api',
});

export async function fetchSettings() {
  try {
    //const response = await apiClient.get('/site-settings/1');
    const response = await apiClient.get(`/site-settings/1?populate=*`);
    return response.data.data.attributes;
  } catch (error) {
    throw error;
  }
}

export async function fetchPredictions() {
  try {
    const response = await apiClient.get('/predictions?populate=*')
    return response.data
  } catch (error) {
    throw error
  }
}

interface RegisterParams {
  email: string
  username: string
  password: string
}

interface LoginParams {
  identifier: string
  password: string
}

export async function register({ email, username, password }: RegisterParams) {
  const response = await apiClient.post(`/auth/local/register`, {
    email,
    username,
    password,
  })
  return response.data
}

export async function login({ identifier, password }: LoginParams) {
  const response = await apiClient.post(`/auth/local`, {
    identifier,
    password,
  })
  return response.data
}
