import { readFile } from "fs/promises";
import createGrid from "../../utils/createGrid.js";

const parseInput = (input) => {
  return input.split("\n").map((pos) => pos.split(",").map(Number));
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

  const grid = createGrid(71, 71, ".");

  for (let i = 0; i < bytePositions.length; i++) {
    const bytePos = bytePositions[i];

    const [x, y] = bytePos;

    grid[y][x] = "#";

    if (!isEndPosReachable(grid)) {
      return bytePos.join(",");
    }
  }
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
