import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input.split("\n").map((l) => l.split(""));
};

const evaluateLine = (line) => {
  const score = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };

  const brackets = {
    "{": "}",
    "[": "]",
    "(": ")",
    "<": ">",
  };

  const stack = [];

  for (const char of line) {
    if (brackets[char]) {
      stack.push(char);
    } else {
      const lastChar = stack.pop();
      if (char !== brackets[lastChar]) {
        return score[char];
      }
    }
  }

  return 0;
};

const solvePuzzle = (input) => {
  const lines = parseInput(input);

  let sum = 0;

  for (const line of lines) {
    const score = evaluateLine(line);

    sum += score;
  }

  return sum;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
