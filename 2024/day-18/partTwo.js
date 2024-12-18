import { readFile } from "fs/promises";
import createGrid from "../../utils/createGrid.js";

const parseInput = (input) => {
  return input.split("\n").map((pos) => pos.split(",").map(Number));
};

const drawMemorySpace = (gridWidth, gridHeight, bytePositions) => {
  const grid = createGrid(gridWidth, gridHeight, ".");

  for (let i = 0; i < bytePositions.length; i++) {
    const [x, y] = bytePositions[i];
    grid[y][x] = "#";
  }

  return grid;
};

const isWithinBounds = (row, col, grid) => {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
};

const isEndPosReachable = (grid) => {
  const rows = grid.length;
  const cols = grid[0].length;
  const endPos = [rows - 1, cols - 1];

  const directions = [
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
    [-1, 0], // up
  ];

  const visited = new Set();
  visited.add(`0,0`);

  const queue = [];
  queue.push([0, 0]);

  while (queue.length > 0) {
    const [row, col] = queue.shift();

    if (row === endPos[0] && col === endPos[1]) {
      return true;
    }

    directions.forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;

      if (
        isWithinBounds(newRow, newCol, grid) &&
        grid[newRow][newCol] !== "#" &&
        !visited.has(`${newRow},${newCol}`)
      ) {
        queue.push([newRow, newCol]);
        visited.add(`${newRow},${newCol}`);
      }
    });
  }

  return false;
};

const solvePuzzle = (input) => {
  const bytePositions = parseInput(input);

  // Populate grid with all bytes
  const grid = drawMemorySpace(71, 71, bytePositions);

  // Start with the last byte position. Go backwards remove
  // bytes one by one and check if end position is reachable
  for (let i = bytePositions.length - 1; i >= 0; i--) {
    const bytePos = bytePositions[i];

    const [x, y] = bytePos;

    grid[y][x] = ".";

    // If the end is reachable return the position
    if (isEndPosReachable(grid)) {
      return bytePos.join(",");
    }
  }

  return null;
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
