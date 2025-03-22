import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input
    .replace(/ /g, "")
    .split("\n")
    .map((e) => e.split(""));
};

const parseTerm = (tokens) => {
  // factor + factor + factor ...
  let value = parseFactor(tokens);
  while (tokens.length > 0 && tokens[0] === "+") {
    tokens.shift(); // Remove the + operator
    let nextFactor = parseFactor(tokens);
    value += nextFactor;
  }
  return value;
};

const parseExpression = (tokens) => {
  // term * term * term ...
  let value = parseTerm(tokens);
  while (tokens.length > 0 && tokens[0] === "*") {
    tokens.shift(); // Remove the *
    let nextTerm = parseTerm(tokens);
    value *= nextTerm;
  }
  return value;
};

const parseFactor = (tokens) => {
  let token = tokens.shift();
  if (token === "(") {
    let value = parseExpression(tokens);
    tokens.shift(); // Remove the closing )
    return value;
  } else {
    return Number(token);
  }
};

const solvePuzzle = (input) => {
  const expressions = parseInput(input);

  let sum = 0;

  for (const tokens of expressions) {
    sum += parseExpression(tokens);
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
