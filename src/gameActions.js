const { getState, changeState, resetGameState } = require("./state");

const {
  isGameWon,
  isMatchFinished,
  prettyPrint
} = require("./helperFunctions");

//   gameActions exposes 3 actions which can be performed by the simulator (index.js)
const actions = {
  // This is the core of the game and changes state appropriately as game progresses
  pointWonBy: player => {
    const gameState = getState();
    const { winner } = gameState;
    if (winner) {
      //game completed
      throw new Error(`Match already won by ${winner}`);
    }

    // console.log(`${player} wins the point.`);
    const newGameStateAfterPointWin = {
      ...gameState,
      points: { ...gameState.points, [player]: gameState.points[player] + 1 }
    };
    changeState(newGameStateAfterPointWin);

    // Award the game to player and reset points to 0,0 if game is won by the player
    if (isGameWon(newGameStateAfterPointWin)) {
      // prettyPrint(`Game won by ${player}`);
      const players = gameState.players;
      const newGameStateAfterGameWin = {
        ...newGameStateAfterPointWin,
        points: { [players[0]]: 0, [players[1]]: 0 },
        games: { ...gameState.games, [player]: gameState.games[player] + 1 }
      };
      changeState(newGameStateAfterGameWin);
      if (isMatchFinished(newGameStateAfterGameWin)) {
        prettyPrint(`GAME SET & MATCH ${player}`);
        changeState({ winner: player });
      }
    }
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
