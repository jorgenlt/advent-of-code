import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input.split("\n").map((l) => l.split(""));
};

const scoring = {
  curlyBracket: 1197,
  squareBracket: 57,
  parenthesis: 3,
  angleBracket: 25137,
};

const evaluateLine = (line) => {
  
}

console.log(evaluateLine("{([(<{}[<>[]}>{[]{[(<()>".split("")))

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
    const input = (await readFile("test.txt", "utf-8")).trim();

    // console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
