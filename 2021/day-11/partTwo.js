import { readFile } from "fs/promises";
import createGrid from "../../utils/createGrid.js";

const parseInput = (input) => {
  return input
    .trim()
    .split("\n")
    .map((l) => l.split("").map(Number));
};

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

const simulate = (octopuses) => {
  let stepCount = 0;

  while (true) {
    stepCount++;
    step(octopuses);

    if (octopuses.every((row) => row.every((cell) => cell === 0))) {
      return stepCount;
    }
  }
};

const solvePuzzle = (input) => {
  const octopuses = parseInput(input);

  const result = simulate(octopuses);

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
