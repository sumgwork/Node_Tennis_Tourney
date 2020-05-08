# Node Tennis Tourney

Tennis Tournament Scorekeeping Program for DiUS

[![Run on Repl.it](https://repl.it/badge/github/sumgwork/DiUS_Tennis_Tourney)](https://repl.it/github/sumgwork/DiUS_Tennis_Tourney)

## Challenge

DiUS has presented a challenge to write a scorekeeping program for a single set tennis match. Please refer to the problem statement in the following link for more details.

[DiUS Tennis Scorekeeping Challenge](https://github.com/DiUS/coding-tests/blob/master/dius_tennis.md)

---

# Solution

## Setup

Clone the repo, and perform an `npm install` or `yarn` to download the dependencies. To execute the application on local environment, please issue `npm start` or `yarn start` command.

### Simulation

`index.js` file in the root of the project contains code for simulating the game with sample outcome.

![Sample simulation code](https://i.ibb.co/f2hNgfQ/sample-code.png)

On execution with **yarn start** or **npm start**, the sample outcome is printed on the console.

![Sample Outcome](https://i.ibb.co/4t0sr0N/sample-output.png)

## Tech Stack

### Main Tech Stack

1. Javascript (language selected for this program)
2. Node (JS environment)
3. Jest (test-runner and test-suites)
4. CircleCI for automating test case execution on commit

## Idea

Idea was to maintain the state of the program at one place and update it through game action methods. Game actions further make use of pure helper functions.

A separate scoring utility is used to calculate and show the score to the users and any point of time. The points are stored in numeric format (1, 2, 3, 4) in the state and the face values **(0, 15, 30, 40, Adv, Duece)** are only calculated while being displayed by the score utility.

![Idea](https://i.ibb.co/sqtmfKR/idea.jpg)

## Testing

**Jest** was chosen as the testing library for this program for the sake of simplicity of execution.

### Coverage

**100% coverage** as depicted in the following report:

![Test Coverage Report](https://i.ibb.co/XyDsSdw/code-coverage.png)

## Continuous Integration

All commits are validated for test case execution with CircleCI framework.

![CircleCI Test Case Execution](https://i.ibb.co/yhbbccT/commit-validation.png)

## Highlights

> Only functional components, no class based approach

> 100% test coverage with extensive number of test suites and cases.

> Helper functions are a collection of pure functions aiding to the solution.

> Tried simulating a redux like pattern where the program state is managed at one place and can be updated only through an incremental method.

> Concepts like pipe (or compose) and closure implemented in some helper functions

## What's not been covered / What can be improved

Since the scope of project wasn't too elaborated, have tried to cover basic stuff while being cautious of time.

1. Could have written more pure functions in **gameActions** where the functions rather than investigating on the state of the program could have been injected with it.
2. Taking user input for game simulation was not considered for this demo.
