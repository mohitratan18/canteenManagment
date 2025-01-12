import axios from 'axios';

const API_BASE_URL = 'https://canteen-managment-system-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

//user login
export const login = async (credentials: any) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response;
  } catch (error) {
    throw error; 
  }
};

// User Signup
export const Signup = async (credentials: any) => {
    try {
      const response = await api.post('/auth/signup', credentials);
      return response;
    } catch (error) {
      throw error; 
    }
  };

  //user Admin login
export const adminLogin = async (credentials: any) => {
    try {
      const response = await api.post('/auth/admin/login', credentials);
      return response;
    } catch (error) {
      throw error; 
    }
  };