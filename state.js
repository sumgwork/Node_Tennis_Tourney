const player1 = "player1";
const player2 = "player2";

// In initial state, games and points are 0, and there is no winner.
// tiebreak, duece conditions are false
const initialGameState = {
  games: { [player1]: 0, [player2]: 0 },
  points: { [player1]: 0, [player2]: 0 },
  isTieBreak: false,
  isDuece: false,
  players: [player1, player2],
  winner: undefined
};

// State is initialised with the initial state on program launch
let state = initialGameState;

// Helper function to return state
const getState = () => state;

// Function resets game state if called
const resetGameState = () => (state = { ...initialGameState });

// State can only be changed by calling this method.
// Follows an incremental update approach so that it is not required to pass entire state
const changeState = newState => (state = { ...state, ...newState });

module.exports = {
  getState,
  changeState,
  resetGameState,
  initialGameState
};
// initialGameState is exported for testing purposes only
