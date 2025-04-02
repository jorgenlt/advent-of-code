import { readFile } from "fs/promises";
import createGrid from "../../utils/createGrid.js";
import transposeMatrix from "../../utils/transposeMatrix.js";

const printGrid = (grid) => grid.forEach((l) => console.log(l.join("")));

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

const populateGrid = (dots) => {
  let maxX = 0;
  let maxY = 0;

  for (const [x, y] of dots) {
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }

  const grid = createGrid(maxX + 1, maxY + 1, ".");

  for (const [x, y] of dots) {
    grid[y][x] = "#";
  }

  return grid;
};

const foldGrid = (grid, instruction) => {
  const [direction, foldIndex] = instruction;

  const workingGrid = direction === "x" ? transposeMatrix(grid) : [...grid];

  const top = workingGrid.slice(0, foldIndex);
  const bottom = workingGrid.slice(foldIndex + 1).reverse();

  for (let y = 0; y < top.length; y++) {
    for (let x = 0; x < top[0].length; x++) {
      if (bottom[y][x] === "#") top[y][x] = "#";
    }
  }

  return direction === "x" ? transposeMatrix(top) : top;
};

const calcDots = (grid) => {
  let count = 0;

  for (const row of grid) {
    for (const cell of row) {
      if (cell === "#") count++;
    }
  }

  return count;
};

const solvePuzzle = (input) => {
  const [dots, instructions] = parseInput(input);

  const grid = populateGrid(dots);

  const foldOnce = foldGrid(grid, instructions[0]);

  return calcDots(foldOnce);
};

const main = async () => {
  try {
    const input = await readFile("input.txt", "utf-8");

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
