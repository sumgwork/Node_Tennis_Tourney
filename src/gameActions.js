const { getState, changeState, resetGameState } = require("./state");
const {
  prettyPrint,
  incrementGamePoint,
  incrementGameCount,
  checkMatchFinishedStatus,
  pipe
} = require("./helperFunctions");

//   gameActions exposes 3 actions which can be performed by the simulator (index.js)
const actions = {
  // This is the core of the game and changes state appropriately as game progresses
  pointWonBy: player => {
    const gameState = getState();
    const newState = pipe(
      incrementGamePoint(player),
      incrementGameCount(player),
      checkMatchFinishedStatus(player)
    )(gameState);
    changeState(newState);
  },

  // Used to start the game, pushes game to initial state and hydrates state with player names.
  startGame: (player1, player2) => {
    prettyPrint(`${player1} and ${player2} are starting the game.`);

    resetGameState();
    changeState({
      players: [player1, player2],
      games: { [player1]: 0, [player2]: 0 },
      points: { [player1]: 0, [player2]: 0 }
    });
  },

  // Utility to reset the game state whenever required
  resetGame: () => {
    resetGameState();
  }
};

module.exports = { actions };
