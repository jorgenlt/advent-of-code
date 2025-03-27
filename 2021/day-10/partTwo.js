import { readFile } from "fs/promises";

const parseInput = (input) => input.split("\n").map((l) => l.split(""));

const isLineValid = (line) => {
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
        return false;
      }
    }
  }

  return true;
};

const getValidLines = (lines) => {
  return lines.filter((line) => isLineValid(line));
};

const scoreCompletion = (completion) => {
  const charPoints = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  };

  let total = 0;

  for (const char of completion) {
    total = total * 5 + charPoints[char];
  }

  return total;
};

const evaluateLine = (line) => {
  const brackets = {
    "{": "}",
    "[": "]",
    "(": ")",
    "<": ">",
  };

  const stack = [];

  line.forEach((char) => (brackets[char] ? stack.push(char) : stack.pop()));

  const completion = [...stack].reverse().map((e) => brackets[e]);

  return scoreCompletion(completion);
};

const solvePuzzle = (input) => {
  const lines = getValidLines(parseInput(input));

  const scores = [];

  lines.forEach((line) => scores.push(evaluateLine(line)));

  scores.sort((a, b) => a - b);

  return scores[Math.floor(scores.length / 2)];
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
