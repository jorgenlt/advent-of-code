import { readFile } from "fs/promises";

const parseInput = (input) => {};

const solvePuzzle = (input) => {};

const main = async () => {
  try {
    const input = await readFile("input.txt", "utf-8");

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
