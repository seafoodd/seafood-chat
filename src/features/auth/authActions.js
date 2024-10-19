import {createAsyncThunk} from "@reduxjs/toolkit";
import {userApi} from "../../app/services/userApi";

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.token;

    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await userApi.endpoints.current.initiate();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, { dispatch, rejectWithValue }) => {
    try {
      const result = await dispatch(
        userApi.endpoints.register.initiate({ username, email, password }),
      );
      return result.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(
        userApi.endpoints.login.initiate({ username, password }),
      );
      if (response.error) {
        console.log(response.error)
        return rejectWithValue(response.error.data.error);
      }
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        console.log(error.response);
        return rejectWithValue(error.response.data.message);
      } else {
        console.log(error);
        return rejectWithValue(error.message);
      }
    }
  },
);
