import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input
    .replace(/ /g, "")
    .split("\n")
    .map((e) => e.split(""));
};

const calculate = (tokens) => {
  let currentValue = 0;
  let operator = "+";

  while (tokens.length > 0) {
    const token = tokens.shift();

    if (!isNaN(Number(token))) {
      const num = Number(token);

      if (operator === "+") {
        currentValue += num;
      } else if (operator === "*") {
        currentValue *= num;
      }
    } else if (token === "+" || token === "*") {
      operator = token;
    } else if (token === "(") {
      const num = calculate(tokens);

      if (operator === "+") {
        currentValue += num;
      } else if (operator === "*") {
        currentValue *= num;
      }
    } else if (token === ")") {
      return currentValue;
    }
  }

  return currentValue;
};

const solvePuzzle = (input) => {
  const expressions = parseInput(input);

  let sum = 0;

  for (const tokens of expressions) {
    sum += calculate(tokens);
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
