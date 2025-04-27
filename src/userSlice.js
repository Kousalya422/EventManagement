import { createSlice } from '@reduxjs/toolkit';

const loadUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

const loadCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

const initialState = {
  users: loadUsers(),            
  currentUser: loadCurrentUser(),
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signup: (state, action) => {
      const { username, email, password } = action.payload;
      const existingUser = state.users.find(user => user.email == email);

      if (existingUser) {
        state.error = 'Email already registered';
      } else {
        const newUser = { username, email, password };
        state.users.push(newUser);
        state.currentUser = newUser;
        state.error = null;
        localStorage.setItem('users', JSON.stringify(state.users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
      }
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find(user => user.email == email && user.password == password);

      if (user) {
        state.currentUser = user;
        state.error = null;
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        state.error = 'Invalid email or password';
      }
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem('currentUser');
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { signup, login, logout, clearError } = userSlice.actions;
export default userSlice.reducer;
