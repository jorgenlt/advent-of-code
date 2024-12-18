import { readFile } from "fs/promises";
import createGrid from "../../utils/createGrid.js";

const parseInput = (input) => {
  return input.split("\n").map((pos) => pos.split(",").map(Number));
};

const drawMemorySpace = (
  gridWidth,
  gridHeight,
  bytePositions,
  numberOfBytes
) => {
  const grid = createGrid(gridWidth, gridHeight, ".");

  for (let i = 0; i < numberOfBytes; i++) {
    const [x, y] = bytePositions[i];
    grid[y][x] = "#";
  }

  return grid;
};

const isWithinBounds = (row, col, grid) => {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
};

const solvePuzzle = (input) => {
  const bytePositions = parseInput(input);
  const grid = drawMemorySpace(71, 71, bytePositions, 1024);
  const rows = grid.length;
  const cols = grid[0].length;
  const endPos = [rows - 1, cols - 1];

  const directions = [
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
    [-1, 0], // up
  ];

  const visited = new Map();
  visited.set(`0,0`, 0);

  const queue = [];
  queue.push([0, 0, 0]);

  while (queue.length > 0) {
    const [row, col, steps] = queue.shift();

    if (row === endPos[0] && col === endPos[1]) {
      return steps;
    }

    directions.forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;

      if (
        isWithinBounds(newRow, newCol, grid) &&
        grid[newRow][newCol] !== "#" &&
        !visited.has(`${newRow},${newCol}`)
      ) {
        queue.push([newRow, newCol, steps + 1]);
        visited.set(`${newRow},${newCol}`, steps + 1);
      }
    });
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
