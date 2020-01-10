const {
  isGameWon,
  isMatchFinished,
  checkCondition,
  isTieBreak
} = require("../helperFunctions");

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
      let games = { player1: 3, player2: 3 };
      const check = checkCondition(points, 4);
      expect(check).not.toBeTruthy();
    });
  });
});
