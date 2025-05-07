import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunks
export const signup = createAsyncThunk('user/signup', async (userData, thunkAPI) => {
  try {
    const response = await fetch('http://localhost:8000/api/auth/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Signup error:", error); // 👈 Add this
      return thunkAPI.rejectWithValue(error);
    }

    return await response.json();
  } catch (err) {
    console.error("Unexpected signup error:", err); // 👈 Add this
    return thunkAPI.rejectWithValue({ error: 'Unexpected signup error' });
  }
});


export const login = createAsyncThunk('user/login', async (credentials, thunkAPI) => {
  try {
    const response = await fetch('http://localhost:8000/api/auth/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    // If the response is not OK, handle the error
    if (!response.ok) {
      const error = await response.json();
      console.log("Login Error:", error); // Log the error response
      return thunkAPI.rejectWithValue(error); // Send the error to redux
    }

    // Otherwise, return the successful response
    return await response.json();
  } catch (error) {
    console.error("Error during login:", error); // Log any unexpected errors
    return thunkAPI.rejectWithValue({ message: 'Login failed due to an unexpected error.' });
  }
});

// Load from localStorage
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

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      localStorage.removeItem('currentUser');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        localStorage.setItem('currentUser', JSON.stringify(action.payload));
      })
      .addCase(signup.rejected, (state, action) => {
        // Enhanced error handling
        state.error = action.payload?.detail || action.payload?.message || 'Signup failed';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        localStorage.setItem('currentUser', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        // Enhanced error handling
        state.error = action.payload?.detail || action.payload?.message || 'Login failed';
      });
  },
});

// Export actions and reducer
export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;
