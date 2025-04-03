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

  const topHeight = top.length;
  const bottomHeight = bottom.length;

  for (let y = 0; y < bottomHeight; y++) {
    const topY = topHeight - bottomHeight + y;

    if (topY < 0 || topY >= topHeight) continue;

    for (let x = 0; x < top[0].length; x++) {
      if (bottom[y][x] === "#") top[topY][x] = "#";
    }
  }

  return direction === "x" ? transposeMatrix(top) : top;
};

const solvePuzzle = (input) => {
  const [dots, instructions] = parseInput(input);

  let grid = populateGrid(dots);

  for (const instruction of instructions) {
    grid = foldGrid(grid, instruction);
  }

  printGrid(grid); // PGHZBFJC

  return grid;
};

const main = async () => {
  try {
    const input = await readFile("input.txt", "utf-8");

    solvePuzzle(input);
  } catch (err) {
    console.error(err);
  }
};

main();
