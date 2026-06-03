import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import type { RegisterData } from '../types/auth';
import axios from 'axios';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be called inside an AuthProvider block.');
  }
  return context;
};

// Inside your useAuth hook or AuthContext file, expose a register method:
export const register = async (data: RegisterData) => {
  try {
    const response = await axios.post('/api/auth/register', data);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Registration failed. Please try again.' 
    };
  }
};