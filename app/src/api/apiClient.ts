// src/api/apiClient.ts
import type { Prediction, LoginCredentials, User, RegisterUser, Bet } from '@/types';
import axios from 'axios';

const jwt = localStorage.getItem('jwt');

const apiClient = axios.create({
  baseURL: 'http://localhost:1337/api',
})

const config = {
  headers: {
    Authorization: `Bearer ${jwt}`
  }
};

export async function fetchSettingsAPI() {
  try {
    const response = await apiClient.get(`/site-settings/1?populate=*`)
    return response.data.data.attributes
  } catch (error) {
    throw error
  }
}

export async function fetchPredictionsAPI() {
  try {
    const response = await apiClient.get('/predictions?populate=*')
    return response.data
  } catch (error) {
    throw error
  }
}

export async function fetchBetsAPI() {
  try {
    const response = await apiClient.get('/bets?populate=*')
    return response.data
  } catch (error) {
    throw error
  }
}

export async function createPredictionAPI(prediction: Prediction): Promise<Prediction> {
  try {
    const response = await apiClient.post('/predictions', { data: prediction }, config)
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to create prediction')
  }
}

export async function createBetAPI(bet: Bet): Promise<Bet> {
  try {
    const response = await apiClient.post('/bets', { 
      data: {
        ...bet,
        prediction: bet.predictionID
      }
    }, config)
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to create bet')
  }
}

// Login function
export async function loginAPI(credentials: LoginCredentials): Promise<User> {
  try {
    const response = await apiClient.post(`/auth/local`, credentials)
    const userData = response.data
    localStorage.setItem('jwt', userData.jwt)
    localStorage.setItem('user', JSON.stringify(userData.user))
    return userData
  } catch (error) {
    throw error
  }
}

// Register function
export async function registerAPI(user: RegisterUser): Promise<User> {
  try {
    const response = await apiClient.post(`/auth/local/register`, user)
    const userData = response.data
    localStorage.setItem('jwt', userData.jwt)
    localStorage.setItem('user', JSON.stringify(userData.user))
    return userData
  } catch (error) {
    throw error
  }
}

export async function refreshToken(): Promise<{
  jwt: string; user: User 
}> {
  try {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
      throw new Error('No JWT token found');
    }

    const response = await apiClient.post('/auth/refresh-token', {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    const newJwt = response.data.jwt;
    const user = response.data.user;
    localStorage.setItem('jwt', newJwt);
    localStorage.setItem('user', JSON.stringify(user));

    return { jwt: newJwt, user };
  } catch (error) {
    throw new Error('Failed to refresh the JWT token');
  }
}


