import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input
    .split("\n")
    .map(Number)
    .sort((a, b) => a - b);
};

const solvePuzzle = (input) => {
  const adapters = parseInput(input);
  adapters.unshift(0);
  adapters.push(adapters[adapters.length - 1] + 3);

  const paths = new Map();
  paths.set(0, 1);

  for (const adapter of adapters.slice(1)) {
    let totalPaths = 0;

    for (let diff = 1; diff <= 3; diff++) {
      const prevAdapter = adapter - diff;
      totalPaths += paths.get(prevAdapter) || 0;
    }

    paths.set(adapter, totalPaths);
  }

  return paths.get(adapters[adapters.length - 1]);
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
