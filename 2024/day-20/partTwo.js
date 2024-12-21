import { readFile } from "fs/promises";
import calculateManhattanDistance from "../../utils/calculateManhattanDistance.js";

const parseInput = (input) => input.split("\n").map((l) => l.split(""));

const getStartEndPos = (grid) => {
  let startPos, endPos;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === "S") startPos = [col, row]; // [x, y]
      if (grid[row][col] === "E") endPos = [col, row]; // [x, y]

      if (startPos && endPos) return { startPos, endPos };
    }
  }
};

const bfsFromEnd = (grid, end) => {
  const rows = grid.length;
  const cols = grid[0].length;
  const distances = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity)
  );

  const queue = [];
  queue.push(end);
  distances[end[1]][end[0]] = 0; // Corrected index

  const directions = [
    [1, 0], // down
    [-1, 0], // up
    [0, 1], // right
    [0, -1], // left
  ];

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (
        newX >= 0 &&
        newX < cols &&
        newY >= 0 &&
        newY < rows &&
        grid[newY][newX] !== "#" &&
        distances[newY][newX] === Infinity
      ) {
        distances[newY][newX] = distances[y][x] + 1;
        queue.push([newX, newY]);
      }
    }
  }

  return distances;
};

const findFastestPath = (grid, start, endDistances) => {
  const queue = [];
  queue.push([start, []]);
  const visited = new Set();
  visited.add(start.toString());

  while (queue.length > 0) {
    const [[x, y], currentPath] = queue.shift();
    const newPath = [...currentPath, [x, y]];

    if (grid[y][x] === "E") return newPath;

    const directions = [
      [1, 0], // down
      [-1, 0], // up
      [0, 1], // right
      [0, -1], // left
    ];

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (
        newX >= 0 &&
        newX < grid[0].length &&
        newY >= 0 &&
        newY < grid.length &&
        grid[newY][newX] !== "#"
      ) {
        const nextPos = [newX, newY];

        if (
          !visited.has(nextPos.toString()) &&
          endDistances[newY][newX] < endDistances[y][x]
        ) {
          visited.add(nextPos.toString());
          queue.push([nextPos, newPath]);
        }
      }
    }
  }

  return [];
};

const countCheats = (grid, path, endDistances, minBenefit) => {
  let cheats = 0;

  for (let i = 0; i < path.length; i++) {
    for (let j = i + 1; j < path.length; j++) {
      const a = path[i];
      const b = path[j];
      const manhattanDistance = calculateManhattanDistance(a, b);

      // For Part 2: change from 2 ps to 20
      if (manhattanDistance > 20) continue;

      const dirPathLength = manhattanDistance;
      const distanceBToEnd = endDistances[b[1]][b[0]];

      if (distanceBToEnd + dirPathLength >= endDistances[a[1]][a[0]]) continue;

      const benefit =
        endDistances[a[1]][a[0]] - (distanceBToEnd + dirPathLength);

      if (benefit >= minBenefit) {
        cheats++;
      }
    }
  }

  return cheats;
};

const solvePuzzle = (input) => {
  const grid = parseInput(input);
  const { startPos, endPos } = getStartEndPos(grid);

  const endDistances = bfsFromEnd(grid, endPos);
  const fastestPath = findFastestPath(grid, startPos, endDistances);
  const result = countCheats(grid, fastestPath, endDistances, 100);

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
