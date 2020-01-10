// Check if both players have won 6 games each irrespective of the number of points
const isTieBreak = gameState =>
  gameState.games[gameState.players[0]] === 6 &&
  gameState.games[gameState.players[1]] === 6;

const isGameWon = gameState => {
  const { points, players } = gameState;
  let sufficientPointDifference =
    Math.abs(points[players[0]] - points[players[1]]) >= 2;

  if (isTieBreak(gameState)) {
    // Player wins if she wins 7 or more points in a tiebreaker with at least 2 point difference
    return checkCondition(points, 7) && sufficientPointDifference;
  } else {
    // Player wins if she wins 4 or more points in a non-tiebreaker game with at least 2 point difference
    return checkCondition(points, 4) && sufficientPointDifference;
  }
};

const isMatchFinished = gameState => {
  const { games, players } = gameState;
  let sufficientGameDifference =
    Math.abs(games[players[0]] - games[players[1]]) >= 2;
  // Player wins if she has won 6 games with 2 game difference, or if she has won 7 games (after tie-breaker)
  return (
    (checkCondition(games, 6) && sufficientGameDifference) ||
    checkCondition(games, 7)
  );
};

// Checks if points condition is true, whether any of the players has a point matching the condition
const checkCondition = (units, value) =>
  Object.values(units).find(unit => unit >= value);

// Just prints message in a block
const prettyPrint = message => {
  console.log("\n----------");
  console.log(message);
  console.log("----------\n");
};

module.exports = {
  isGameWon,
  isMatchFinished,
  prettyPrint,
  isTieBreak,
  checkCondition
};
//exported isTieBreak and checkCondition functions only for testing
