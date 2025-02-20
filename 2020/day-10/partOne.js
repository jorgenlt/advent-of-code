import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input
    .split("\n")
    .map(Number)
    .sort((a, b) => a - b);
};

const solvePuzzle = (input) => {
  const adapters = parseInput(input);

  let oneCount = 0;
  let threeCount = 0;

  for (let i = 0; i < adapters.length; i++) {
    const prev = i > 0 ? adapters[i - 1] : 0;
    const curr = adapters[i];

    if (curr - prev === 1) {
      oneCount++;
    } else if (curr - prev === 3) {
      threeCount++;
    }

    if (i === adapters.length - 1) {
      threeCount++;
    }
  }

  return oneCount * threeCount;
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
