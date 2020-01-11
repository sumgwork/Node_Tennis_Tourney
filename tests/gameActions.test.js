const { getState, changeState, initialGameState } = require("../src/state");
const { actions } = require("../src/gameActions");

const mockState = {
  games: { Roger: 0, Rafael: 0 },
  points: { Roger: 0, Rafael: 0 },
  isDuece: false,
  players: ["Roger", "Rafael"],
  winner: undefined
};

const { startGame, pointWonBy, resetGame } = actions;

describe("gameActions", () => {
  describe("startGame", () => {
    beforeEach(() => {
      startGame("mockPlayer1", "mockPlayer2");
      // global.console = {
      //   log: jest.fn().mockImplementation(message => {})
      // };
    });
    it("should take new players and start the game with these players", () => {
      const newState = getState();
      expect(newState.players).toEqual(["mockPlayer1", "mockPlayer2"]);
    });
    it("should set the points and games to 0", () => {
      const newState = getState();
      expect(newState.games).toEqual({ mockPlayer1: 0, mockPlayer2: 0 });
      expect(newState.points).toEqual({ mockPlayer1: 0, mockPlayer2: 0 });
    });
  });
  describe("pointWonBy", () => {
    beforeEach(() => {
      changeState({ ...mockState });
    });
    //Test if there is already a winner, the function call shall throw an exception
    it("should throw an error if a winner is already announced", () => {
      const winner = "mockPlayer";
      changeState({
        ...mockState,
        winner
      });
      try {
        pointWonBy(winner);
        // If above statement doesn't throw an exception, fail the test case
        expect(false).toBe(true);
      } catch (error) {
        expect(error.message).toBe(`Match already won by ${winner}`);
      }
    });

    // Award a point to the player who won the point
    it("should award a point to the player who won the point", () => {
      pointWonBy(mockState.players[0]);
      expect(Object.values(getState().points)[0]).toBe(1);
    });

    // Award a game to the player who won the point if the player is on game point
    it("should award a game to the player who won the point if the player is on game point", () => {
      changeState({
        ...mockState,
        points: { [mockState.players[0]]: 3, [mockState.players[1]]: 2 }
      });
      pointWonBy(mockState.players[0]);
      const newState = getState();
      expect(Object.values(newState.games)[0]).toBe(1);
    });

    // Push game to duece if both players stand at 40-40 after the point is won
    it("should push game to duece if both players stand at 40-40 after the point is won", () => {
      changeState({
        ...mockState,
        points: { [mockState.players[0]]: 2, [mockState.players[1]]: 3 }
      });
      pointWonBy(mockState.players[0]);
      const newState = getState();
      expect(Object.values(getState().games)[0]).toBe(0);
      expect(Object.values(getState().points)[0]).toBe(3);
      expect(Object.values(getState().points)[1]).toBe(3);
    });

    // Give advantage to the player who won the point if the other player is at advantage at duece
    it("should give advantage to the player who won the point if the other player is at advantage at duece", () => {
      changeState({
        ...mockState,
        points: { [mockState.players[0]]: 3, [mockState.players[1]]: 3 }
      });
      pointWonBy(mockState.players[0]);
      const newState = getState();
      expect(Object.values(getState().points)[0]).toBe(4);
      expect(Object.values(getState().points)[1]).toBe(3);
    });

    // Award the game to the player if she was at advantage in duece situation
    it("should award the game to the player if she was at advantage in duece situation, and resets the points", () => {
      changeState({
        ...mockState,
        points: { [mockState.players[0]]: 4, [mockState.players[1]]: 3 }
      });
      pointWonBy(mockState.players[0]);
      const newState = getState();
      expect(Object.values(getState().games)[0]).toBe(1);
      expect(Object.values(getState().points)[0]).toBe(0);
      expect(Object.values(getState().points)[1]).toBe(0);
    });

    // Award the match to the player if the player is on match point
    it("should award the match to the player if the player is on match point", () => {
      changeState({
        ...mockState,
        points: { [mockState.players[0]]: 3, [mockState.players[1]]: 1 },
        games: { [mockState.players[0]]: 5, [mockState.players[1]]: 4 }
      });
      pointWonBy(mockState.players[0]);
      const newState = getState();
      expect(Object.values(getState().games)[0]).toBe(6);
      expect(getState().winner).toBe(mockState.players[0]);
    });
  });
  describe("resetGame", () => {
    beforeEach(() => {
      resetGame();
    });
    it("should reset the game back to initial state", () => {
      const newState = getState();
      expect(newState).toEqual(initialGameState);
    });
  });
});
