import { readFile } from "fs/promises";
import createGrid from "../../utils/createGrid.js";

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
  console.log(grid.length)

  const [direction, foldLine] = instruction
  
  if (direction === "y") {
    const top = grid.slice(0, foldLine);
    const bottom = grid.slice(foldLine + 1).reverse();
  
    for (let y = 0; y < top.length; y++) {
      for (let x = 0; x < top[0].length; x++) {
        if (bottom[y][x] === "#") top[y][x] = "#"        
      }
    }

    return top;
  }

  if (direction === "x") {
    
  }
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

  const fold1 = foldGrid(grid, instructions[0]);
  console.log(calcDots(fold1))
  // console.log(fold1);

  // const fold2 = foldGrid(fold1, instructions[1]);

  // return calcDots(foldGrid(grid, instructions[0]));
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
