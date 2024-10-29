import { configureStore } from '@reduxjs/toolkit';

// Reducers
import userReducer from '../features/userSlice';
import gameReducer from '../features/gameSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
  },
});