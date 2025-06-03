import { createSlice } from '@reduxjs/toolkit';

const userFromStorage = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: userFromStorage || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    // registerSuccess: (state, action) => {
    //   state.user = action.payload;
    //   localStorage.setItem('user', JSON.stringify(action.payload));
    // },
  },
});

export const { loginSuccess, logout, registerSuccess } = authSlice.actions;
export default authSlice.reducer;