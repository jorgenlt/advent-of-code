import { readFile } from "fs/promises";

const parseInput = (input) => {
  const [section1, section2] = input.trim().split("\n\n");

  const dots = section1.split("\n").map((l) => l.split(",").map(Number));

  const instructions = section2.split("\n").map((l) =>
    l
      .split(" ")[2]
      .split("=")
      .map((e) => (!isNaN(e) ? Number(e) : e))
  );

  return [dots, instructions];
};

const createGrid = (dots) => {};

const foldGrid = (grid, instruction) => {};

const calcDots = (grid) => {};

const solvePuzzle = (input) => {
  const [dots, instructions] = parseInput(input);

  const grid = createGrid(dots);

  return calcDots(foldGrid(grid, instructions[0]));
};

const main = async () => {
  try {
    const input = await readFile("test.txt", "utf-8");

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
