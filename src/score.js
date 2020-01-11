const { getState } = require("./state");
const { isTieBreak } = require("./helperFunctions");

const getScore = () => {
  const state = getState();
  const { points, players, games } = state;
  const [player1, player2] = players;

  return `Players: \t${player1}\t${player2} \n GAMES \t\t${games[player1]}\t${
    games[player2]
  } \n POINTS \t${prettyPrintPoints(getPoints(points))}`;
};

const getPoints = points => {
  const gameState = getState();
  const { players } = gameState;
  switch (isTieBreak(gameState)) {
    case true:
      // Tie break, return points as such
      return {
        points: [points[players[0]], points[players[1]]],
        isDuece: false
      };
    case false:
      // Duece Scenario
      if (points[players[0]] >= 3 && points[players[1]] >= 3) {
        return {
          points: [points[players[0]], points[players[1]]],
          isDuece: true
        };
      }
      // Not a duece, no tie-break: Return point face values
      else {
        let values = [0, 15, 30, 40];
        return {
          points: [values[points[players[0]]], values[points[players[1]]]],
          isDuece: false
        };
      }
  }
};

const prettyPrintPoints = ({ points, isDuece }) => {
  if (isDuece) {
    if (points[0] === points[1]) {
      return "   DUECE   ";
    } else {
      return points[0] > points[1] ? "ADV\t" : "\tADV";
    }
  } else {
    return `${points[0]}\t${points[1]}`;
  }
};

const score = () => console.log(getScore());

module.exports = { score, getScore, getPoints, prettyPrintPoints };
//getScore, getPoints, prettyPrintPoints have been exported for testing purposes only
