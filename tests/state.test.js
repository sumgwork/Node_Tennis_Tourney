const { getState, changeState, resetGameState } = require("../state");

const mockState = {
  games: { player1: 0, player2: 0 },
  points: { player1: 0, player2: 0 },
  isDuece: false,
  players: ["player1", "player2"],
  winner: undefined
};

describe("State", () => {
  describe("getState", () => {
    it("should return the complete current state", () => {
      const state = getState();
      expect(state).toMatchObject(mockState);
    });
  });
  describe("resetGameState", () => {
    it("should change the current game state back to initial state", () => {
      resetGameState();
      const stateAfterReset = getState();
      expect(stateAfterReset).toMatchObject(mockState);
      expect(stateAfterReset.games).toEqual({ player1: 0, player2: 0 });
    });
  });
  describe("changeState", () => {
    it("should change state incrementally (only the value which is updated)", () => {
      const prevState = getState();
      changeState({ isDuece: true });
      const newState = getState();
      expect(newState.isDuece).toBe(true);
      expect(newState.games).toEqual(prevState.games);
    });
  });
});
