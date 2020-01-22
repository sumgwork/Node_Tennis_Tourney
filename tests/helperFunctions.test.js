const {
  isGameWon,
  isMatchFinished,
  checkCondition,
  isTieBreak,
  prettyPrint,
  incrementGamePoint,
  incrementGameCount,
  checkMatchFinishedStatus,
  pipe
} = require("../src/helperFunctions");

const points = { player1: 0, player2: 0 };
const games = { player1: 0, player2: 0 };
const players = ["player1", "player2"];

describe("Helper Functions", () => {
  let gameState = {};

  beforeEach(() => {
    gameState = { points, games, players };
  });

  describe("isTieBreak", () => {
    // Test if it is a tie break
    it("should return true if it is a tie-break", () => {
      gameState = { ...gameState, games: { player1: 6, player2: 6 } };
      const check = isTieBreak(gameState);
      expect(check).toBeTruthy();
    });

    // Test if it's not a tiebreak
    it("should return false if it is not a tie-break", () => {
      gameState = { ...gameState, games: { player1: 3, player2: 4 } };
      const check = isTieBreak(gameState);
      expect(check).not.toBeTruthy();
    });
  });

  describe("isGameWon", () => {
    // Test if the game is won without going in duece
    it("should return true if the game is complete (non-duece)", () => {
      gameState = { ...gameState, points: { player1: 4, player2: 2 } };
      const check = isGameWon(gameState);
      expect(check).toBeTruthy();
    });

    // Test if the game is still in progress
    it("should return false if the game is in progress (non-duece)", () => {
      gameState = { ...gameState, points: { player1: 3, player2: 2 } };
      const check = isGameWon(gameState);
      expect(check).not.toBeTruthy();
    });

    // Test if the game is won after duece
    it("should return true if the game is complete (post-duece)", () => {
      gameState = { ...gameState, points: { player1: 8, player2: 6 } };
      const check = isGameWon(gameState);
      expect(check).toBeTruthy();
    });

    // Test if the game is in duece
    it("should return false if the game is in progress (duece/adv)", () => {
      gameState = { ...gameState, points: { player1: 4, player2: 3 } };
      const check = isGameWon(gameState);
      expect(check).not.toBeTruthy();
    });

    // Test if the game is won after a tiebreak
    it("should return true if the game is won following a tie-breaker", () => {
      gameState = {
        ...gameState,
        points: { player1: 4, player2: 7 },
        games: { player1: 6, player2: 6 }
      };
      const check = isGameWon(gameState);
      expect(check).toBeTruthy();
    });
  });

  describe("isMatchFinished", () => {
    // Test if match has completed without going into tiebreaker
    it("should return true if match has completed without going into tiebreaker", () => {
      gameState = { ...gameState, games: { player1: 6, player2: 4 } };
      const check = isMatchFinished(gameState);
      expect(check).toBeTruthy();
    });

    // Test if match has completed after going into tiebreaker
    it("should return true if match has completed after going into tiebreaker", () => {
      gameState = { ...gameState, games: { player1: 6, player2: 7 } };
      const check = isMatchFinished(gameState);
      expect(check).toBeTruthy();
    });

    // Test if match is still in progress
    it("should return false if match is still in progress", () => {
      gameState = { ...gameState, games: { player1: 5, player2: 6 } };
      const check = isMatchFinished(gameState);
      expect(check).not.toBeTruthy();
    });
  });

  describe("checkCondition", () => {
    // Test if it matches condition
    it("should return true in case of a match", () => {
      let points = { player1: 6, player2: 3 };
      const check = checkCondition(points, 6);
      expect(check).toBeTruthy();
    });

    // Test if it doesn't match condition
    it("should return false in case of a no-match", () => {
      const check = checkCondition(points, 4);
      expect(check).not.toBeTruthy();
    });
  });

  describe("prettyPrint", () => {
    beforeEach(() => {
      // create a function into global context for Jest
      global.console = {
        log: jest.fn()
      };
    });
    const mockMessage = "mock message";
    it("should call console.log thrice when passed a message", () => {
      prettyPrint(mockMessage);
      expect(global.console.log.mock.calls.length).toBe(3);
    });
    it("should ensure that first argument to second call of console.log contains the message", () => {
      prettyPrint(mockMessage);
      expect(global.console.log.mock.calls[1][0]).toBe(mockMessage);
    });
    it("should not call any console.log statement if no message is passed", () => {
      prettyPrint();
      expect(global.console.log.mock.calls.length).toBe(0);
    });
  });

  describe("incrementGamePoint", () => {
    let incrementGamePointFn = null;

    beforeEach(() => {
      incrementGamePointFn = incrementGamePoint("player1");
    });

    //Test if there is already a winner, the function call shall throw an exception
    it("should throw an error if there is already a winner announced", () => {
      const winner = "player1";
      gameState = {
        ...gameState,
        winner
      };
      try {
        incrementGamePointFn(gameState);
        // If above statement doesn't throw an exception, fail the test case
        expect(false).toBe(true);
      } catch (error) {
        expect(error.message).toBe(`Match already won by ${winner}`);
      }
    });

    // Award a point to the player who won the point
    it("should award a point to the player who won the point", () => {
      const newState = incrementGamePointFn(gameState);
      expect(Object.values(newState.points)[0]).toBe(1);
    });
  });

  describe("incrementGameCount", () => {
    let incrementGameCountFn = null;

    beforeEach(() => {
      incrementGameCountFn = incrementGameCount("player1");
    });

    // Award a game to the player who won the point if the player is on game point
    it("should award a game to the player who won the point if the player is on game point", () => {
      gameState = {
        ...gameState,
        points: { [gameState.players[0]]: 4, [gameState.players[1]]: 2 }
      };
      const newState = incrementGameCountFn(gameState);
      expect(Object.values(newState.games)[0]).toBe(1);
    });

    it("should return the same state if the game is not won", () => {
      gameState = {
        ...gameState,
        points: { [gameState.players[0]]: 3, [gameState.players[1]]: 2 }
      };
      const newState = incrementGameCountFn(gameState);
      expect(newState).toEqual(gameState);
    });
  });

  describe("checkMatchFinishedStatus", () => {
    let checkMatchFinishedStatusFn = null;

    beforeEach(() => {
      checkMatchFinishedStatusFn = checkMatchFinishedStatus("player1");
    });

    // Award the match to the player if the player is on match point
    it("should award the match to the player if the player is on match point", () => {
      gameState = {
        ...gameState,
        points: { [gameState.players[0]]: 0, [gameState.players[1]]: 0 },
        games: { [gameState.players[0]]: 6, [gameState.players[1]]: 4 }
      };
      const newState = checkMatchFinishedStatusFn(gameState);
      expect(Object.values(newState.games)[0]).toBe(6);
      expect(newState.winner).toBe(gameState.players[0]);
    });

    it("should return the same state if the match is not won", () => {
      gameState = {
        ...gameState,
        points: { [gameState.players[0]]: 3, [gameState.players[1]]: 2 },
        games: { [gameState.players[0]]: 6, [gameState.players[1]]: 5 }
      };
      const newState = checkMatchFinishedStatusFn(gameState);
      expect(newState).toEqual(gameState);
    });
  });

  describe("pipe", () => {
    const mockFn1 = jest.fn(val => val + 1);
    const mockFn2 = jest.fn(val => val + 1);
    const mockFn3 = jest.fn(val => val + 1);

    const input = 0;
    let output = null;

    beforeEach(() => {
      output = pipe(mockFn1, mockFn2, mockFn3)(input);
    });

    it("should call function 1 with given input", () => {
      expect(mockFn1).toHaveBeenCalledWith(0);
    });

    it("should call function 2 with output of function 1", () => {
      expect(mockFn2).toHaveBeenCalledWith(1);
    });

    it("should call function 3 with output of function 2", () => {
      expect(mockFn3).toHaveBeenCalledWith(2);
    });

    it("should pipe functions together", () => {
      expect(output).toBe(3);
    });
  });
});
