const {
  score,
  getScore,
  getPoints,
  prettyPrintPoints
} = require("../src/score");

const { changeState, getState } = require("../src/state");

const mockState = {
  games: { player1: 0, player2: 0 },
  points: { player1: 0, player2: 0 },
  isDuece: false,
  players: ["player1", "player2"],
  winner: undefined
};

describe("Score", () => {
  describe("score", () => {
    global.console = {
      log: jest.fn()
    };
    beforeEach(() => {
      changeState({ ...mockState });
      score();
    });
    it("invokes console.log", () => {
      expect(global.console.log.mock.calls.length).toBe(1);
    });
    it("prints score on being successfully invoked", () => {
      expect(global.console.log.mock.calls[0][0]).toBe(getScore());
    });
  });

  describe("getScore", () => {
    it("should return prettified score on being invoked", () => {
      changeState({ ...mockState });
      const score = getScore();
      expect(score).toBe(
        `Players: \tplayer1\tplayer2 \n GAMES \t\t0\t0 \n POINTS \t${prettyPrintPoints(
          getPoints(mockState.points)
        )}`
      );
    });
  });

  describe("getPoints", () => {
    describe("TIE BREAK", () => {
      beforeEach(() => {
        changeState({
          points: { [mockState.players[0]]: 3, [mockState.players[1]]: 5 },
          games: { [mockState.players[0]]: 6, [mockState.players[1]]: 6 }
        });
      });
      it("should returns points without face values (as it is)", () => {
        const points = getPoints(getState().points);
        expect(points).toEqual({ points: [3, 5], isDuece: false });
      });
    });

    describe("NO TIE BREAK", () => {
      beforeEach(() => {
        changeState({
          points: { [mockState.players[0]]: 5, [mockState.players[1]]: 4 },
          games: { [mockState.players[0]]: 4, [mockState.players[1]]: 4 }
        });
      });
      it("should return points without face values for duece", () => {
        const points = getPoints(getState().points);
        expect(points).toEqual({ points: [5, 4], isDuece: true });
      });
      it("should return points with face values for normal condition", () => {
        changeState({
          points: { [mockState.players[0]]: 3, [mockState.players[1]]: 2 }
        });
        const points = getPoints(getState().points);
        expect(points).toEqual({ points: [40, 30], isDuece: false });
      });
    });
  });

  describe("prettyPrintPoints", () => {
    // returns DUECE in case of a duece
    it("should return DUECE in case of a duece", () => {
      const points = prettyPrintPoints({ points: [3, 3], isDuece: true });
      expect(points).toMatch(/DUECE/);
    });

    // returns advantage to first player
    it("should return advantage to first player", () => {
      const points = prettyPrintPoints({ points: [5, 4], isDuece: true });
      expect(points).toBe("ADV\t");
    });
    // returns advantage to second player
    it("should return advantage to second player", () => {
      const points = prettyPrintPoints({ points: [3, 4], isDuece: true });
      expect(points).toBe("\tADV");
    });

    // returns points in normal case
    it("should return points in normal case", () => {
      const points = prettyPrintPoints({ points: [40, 15], isDuece: false });
      expect(points).toBe("40\t15");
    });
  });
});
