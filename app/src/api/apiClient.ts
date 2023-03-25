// src/api/apiClient.ts
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
    //const response = await apiClient.get('/site-settings/1');
    const response = await apiClient.get(`/site-settings/1?populate=*`)
    return response.data.data.attributes;
  } catch (error) {
    throw error;
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

export async function createPredictionAPI(prediction: Prediction): Promise<Prediction> {
  try {
    const response = await apiClient.post('/predictions', { data: prediction }, config)
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to create prediction')
  }
}

/*
async createPrediction(newPrediction: NewPrediction) {
  try {
    const user = await getUser(); // get the current user
    const response = await apiClient.post('/predictions', {
      ...newPrediction,
      author: user.id, // set the author field to the current user's ID
    });
    const prediction = response.data as Prediction;
    this.addPrediction(prediction);
    return prediction;
  } catch (error) {
    console.error((error as Error).message);
    throw error;
  }
},
*/

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

export async function refreshToken(): Promise<{ jwt: string; user: User }> {
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


