import { readFile } from "fs/promises";

const parseInput = (input) => {
  const grid = input
    .split("\n")
    .map((l) => l.split("").map((e) => (e === "#" ? true : false)));

  return grid;
};

const countOnNeighbours = (grid, i, j) => {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let onCount = 0;

  const rows = grid.length;
  const cols = grid[0].length;

  for (const [di, dj] of directions) {
    const ni = i + di;
    const nj = j + dj;

    if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && grid[ni][nj]) {
      onCount++;
    }
  }

  return onCount;
};

const simulateStep = (grid) => {
  const rows = grid.length;
  const cols = grid[0].length;

  const newGrid = Array.from({ length: rows }, () => Array(cols).fill(false));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const onNeighbours = countOnNeighbours(grid, i, j);

      if (grid[i][j]) {
        newGrid[i][j] = onNeighbours === 2 || onNeighbours === 3;
      } else {
        newGrid[i][j] = onNeighbours === 3;
      }
    }
  }

  return newGrid;
};

const countLightsOn = (grid) => {
  let count = 0;

  grid.forEach((row) => {
    row.forEach((light) => {
      if (light) count++;
    });
  });

  return count;
};

const solvePuzzle = (input) => {
  let grid = parseInput(input);

  for (let i = 0; i < 100; i++) {
    grid = simulateStep(grid);
  }

  const result = countLightsOn(grid);

  return result;
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
