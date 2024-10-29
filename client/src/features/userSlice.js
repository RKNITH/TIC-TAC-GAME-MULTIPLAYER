import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
  },
  reducers: {
    userInfo: (state, action) => {
        state.username = action.payload.username;
        state.email = action.payload.email;
    }
  }
});

// this is for dispatch
export const { userInfo } = userSlice.actions;

// this is for configureStore
export default userSlice.reducer;