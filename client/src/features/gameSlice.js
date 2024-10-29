import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    owner: '',
    rival: '',
    ownerName: '',
    rivalName: '',
    board: ['', '', '', '', '', '', '', '', ''],
    status: '',
  },
  reducers: {
    gameInfo: (state, action) => {
        state.owner = action.payload.owner;
        state.rival = action.payload.rival;
        state.ownerName = action.payload.ownerName;
        state.rivalName = action.payload.rivalName;
        state.board = action.payload.board;
        state.status = action.payload.status;
    },
    updateGame: (state, action) => {
        state.board = action.payload.board;
        state.status = action.payload.status;
        state.winner = action.payload.winner;
        state.turn = action.payload.turn;
    },
    resetGame: (state) => {
        state.board = ['', '', '', '', '', '', '', '', ''];
    }
  }
});

// this is for dispatch
export const { gameInfo, updateGame, resetGame } = gameSlice.actions;

// this is for configureStore
export default gameSlice.reducer;