import { readFile } from "fs/promises";

const parseInput = (input) => input.split(",").map(Number);

const knotHash = (lengths, listSize = 256) => {
  const list = Array.from({ length: listSize }, (_, i) => i);
  let currentPosition = 0;
  let skipSize = 0;

  for (const length of lengths) {
    // Reverse
    for (let i = 0; i < Math.floor(length / 2); i++) {
      const start = (currentPosition + i) % listSize;
      const end = (currentPosition + length - 1 - i) % listSize;
      [list[start], list[end]] = [list[end], list[start]];
    }

    // Move current position forward
    currentPosition = (currentPosition + length + skipSize) % listSize;

    skipSize++;
  }

  return list[0] * list[1];
};

const solvePuzzle = (input) => {
  const inputLengths = parseInput(input);

  const result = knotHash(inputLengths);

  console.log(result);

  return result;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    solvePuzzle(input);
  } catch (err) {
    console.error(err);
  }
};

main();
