import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input.split("\n").map((l) => l.split("-").map(Number));
};

const getWhitelist = (blacklist) => {
  const whitelisted = [];

  // Sort blacklist
  blacklist.sort((a, b) => a[0] - b[0]);

  let current = 0;

  for (const [start, end] of blacklist) {
    if (current < start) {
      for (let i = current; i < start; i++) {
        whitelisted.push(i);
      }
    }

    current = Math.max(current, end + 1);
  }

  return whitelisted;
};

const solvePuzzle = (input) => {
  const blacklist = parseInput(input);
  const whitelist = getWhitelist(blacklist, 0);

  return whitelist[0];
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
