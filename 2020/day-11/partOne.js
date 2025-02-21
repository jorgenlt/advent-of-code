import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input.split("\n").map((l) => l.split(""));
};

const adjacentPositions = [
  [-1, -1], // Top left
  [0, -1], // Up
  [1, -1], // Top right
  [1, 0], // Right
  [1, 1], // Bottom right
  [0, 1], // Bottom
  [-1, 1], // Bottom left
  [-1, 0], // Left
];

const getOccupied = (x, y, grid, adjacentPositions) => {
  let occupied = 0;

  for (const [dx, dy] of adjacentPositions) {
    const newX = x + dx;
    const newY = y + dy;

    if (newX >= 0 && newX < grid[y].length && newY >= 0 && newY < grid.length) {
      const adjacent = grid[newY][newX];

      if (adjacent === "#") {
        occupied++;
      }
    }
  }
  return occupied;
};

const runSimulation = (grid) => {
  const newGrid = grid.map((e) => [...e]); // Deep copy

  let changed = false;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const currentSeat = grid[y][x];

      if (currentSeat === ".") continue;

      const occupied = getOccupied(x, y, grid, adjacentPositions);

      if (currentSeat === "L" && occupied === 0) {
        newGrid[y][x] = "#";
        changed = true;
      }

      if (currentSeat === "#" && occupied >= 4) {
        newGrid[y][x] = "L";
        changed = true;
      }
    }
  }

  return { grid: newGrid, changed };
};

const calculateOccupied = (grid) => {
  let occupied = 0;

  grid.forEach((l) => {
    l.forEach((seat) => {
      if (seat === "#") {
        occupied++;
      }
    });
  });

  return occupied;
};

const solvePuzzle = (input) => {
  const grid = parseInput(input);

  let simulation = runSimulation(grid);

  while (simulation.changed) {
    simulation = runSimulation(simulation.grid);
  }

  return calculateOccupied(simulation.grid);
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
