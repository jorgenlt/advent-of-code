import { readFile } from "fs/promises";
import createGrid from "../../utils/createGrid.js";

const parseInput = (input) => {
  return input
    .trim()
    .split("\n")
    .map((l) => l.split("").map(Number));
};

/*
You can model the energy levels and flashes of light in steps. 
During a single step, the following occurs:

First, the energy level of each octopus increases by 1.

Then, any octopus with an energy level greater than 9 flashes. 
This increases the energy level of all adjacent octopuses by 1, 
including octopuses that are diagonally adjacent. If this causes 
an octopus to have an energy level greater than 9, it also flashes. 
This process continues as long as new octopuses keep having their energy 
level increased beyond 9. (An octopus can only flash at most once per step.)

Finally, any octopus that flashed during this step has its energy 
level set to 0, as it used all of its energy to flash.

*/

const directions = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
  [-1, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
];

const step = (octopuses) => {
  const yMax = octopuses.length;
  const xMax = octopuses[0].length;

  const flashed = createGrid(xMax, yMax, false);

  // Increase energy of all octopuses by 1
  for (let y = 0; y < yMax; y++) {
    for (let x = 0; x < xMax; x++) {
      octopuses[y][x]++;
    }
  }

  // Process flashes
  let newFlash = true;
  while (newFlash) {
    newFlash = false;

    for (let y = 0; y < yMax; y++) {
      for (let x = 0; x < xMax; x++) {
        if (octopuses[y][x] > 9 && !flashed[y][x]) {
          flashed[y][x] = true;
          newFlash = true;

          for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;

            if (newX >= 0 && newX < xMax && newY >= 0 && newY < yMax) {
              octopuses[newY][newX]++;
            }
          }
        }
      }
    }
  }

  // Set octopuses that flashed to 0
  for (let y = 0; y < yMax; y++) {
    for (let x = 0; x < xMax; x++) {
      if (flashed[y][x]) {
        octopuses[y][x] = 0;
      }
    }
  }

  return octopuses;
};

const simulate = (octopuses, steps) => {
  let totalFlashes = 0;

  for (let i = 0; i < steps; i++) {
    step(octopuses);

    for (const row of octopuses) {
      for (const cell of row) {
        if (cell === 0) totalFlashes++;
      }
    }
  }

  return totalFlashes;
};

const solvePuzzle = (input) => {
  const octopuses = parseInput(input);

  const result = simulate(octopuses, 100);

  return result;
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
