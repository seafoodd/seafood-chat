import { createAsyncThunk } from '@reduxjs/toolkit'
import {userApi} from '../../app/services/userApi'

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.token;

    if (!token) {
      return rejectWithValue('No token found');
    }

    try {
      const response = await userApi.endpoints.current.initiate();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }, { dispatch, rejectWithValue }) => {
    try {
      const result = await dispatch(userApi.endpoints.register.initiate({ username, email, password }));
      const response = result.data;
      console.log('API response:', response); // Log the entire response object
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(userApi.endpoints.login.initiate({ email, password }));
      localStorage.setItem('token', response.token);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);