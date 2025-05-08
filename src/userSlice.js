import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from './api';

export const signup = createAsyncThunk('user/signup', async (userData, thunkAPI) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Signup error:", error);
      return thunkAPI.rejectWithValue(error);
    }

    const data = await response.json();
    return data; 
  } catch (err) {
    console.error("Unexpected signup error:", err);
    return thunkAPI.rejectWithValue({ message: 'Unexpected signup error' });
  }
});

export const login = createAsyncThunk('user/login', async (credentials, thunkAPI) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log("Login Error:", error);
      return thunkAPI.rejectWithValue(error);
    }

    const data = await response.json();
    return {
      user: {
        ...data.user,
        role: data.user?.role || data.role,
      },
      token: data.token,
    };
  } catch (error) {
    console.error("Error during login:", error);
    return thunkAPI.rejectWithValue({ message: 'Login failed due to an unexpected error.' });
  }
});

const loadCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

const initialState = {
  currentUser: loadCurrentUser(),
  token: loadCurrentUser()?.token || null,
  error: null,
  status: 'idle',
};

const extractErrorMessage = (errorObj) => {
  if (typeof errorObj === 'string') return errorObj;
  if (errorObj.message) return errorObj.message;
  if (errorObj.detail) return errorObj.detail;
  if (Array.isArray(errorObj)) return errorObj[0];
  return 'An error occurred';
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      state.status = 'idle';
      localStorage.removeItem('currentUser');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = extractErrorMessage(action.payload);
      })

      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        localStorage.setItem('currentUser', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = extractErrorMessage(action.payload);
      });
  },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;
