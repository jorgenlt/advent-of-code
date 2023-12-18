import fs from "fs/promises";
import { Heap } from "heap-js";

// Function to create a set of visited positions
const createVisited = (minSteps, maxSteps) => {
  const visited = new Set();

  // Function to check if a position has been visited
  const check = ({ row, col, rowDir, colDir, consecutive }) => {
    // Creating a unique key for the position
    const key =
      (row << 24) |
      (col << 16) |
      ((rowDir & 3) << 14) |
      ((colDir & 3) << 12) |
      consecutive;

    // Checking if the position has already been visited
    if (visited.has(key)) return true;

    // If not visited, adding the position to the visited set
    if (consecutive >= minSteps) {
      for (let i = 0; i <= maxSteps - consecutive; ++i) visited.add(key + i);
    } else {
      visited.add(key);
    }

    return false;
  };

  return {
    check,
  };
};

// Function to try moving in a given direction
const tryDirection = (
  positions,
  pos,
  rowDir,
  colDir,
  minSteps,
  maxSteps,
  map
) => {
  const nextRow = pos.row + rowDir;
  const nextCol = pos.col + colDir;
  const sameDirection = rowDir === pos.rowDir && colDir === pos.colDir;

  // Boundary check
  if (
    nextRow < 0 ||
    nextRow >= map.length ||
    nextCol < 0 ||
    nextCol >= map[0].length
  ) {
    return;
  }

  // Backwards check
  if (rowDir === -pos.rowDir && colDir === -pos.colDir) {
    return;
  }

  // Max steps check
  if (pos.consecutive === maxSteps && sameDirection) {
    return;
  }

  // Min steps check
  if (
    pos.consecutive < minSteps &&
    !sameDirection &&
    !(pos.row === 0 && pos.col === 0)
  ) {
    return;
  }

  // Adding the next position to the positions heap with updated values
  positions.push({
    row: nextRow,
    col: nextCol,
    rowDir,
    colDir,
    consecutive: sameDirection ? pos.consecutive + 1 : 1,
    heat: pos.heat + map[nextRow][nextCol],
  });
};

// Function to find the minimum heat path
const minHeat = (minSteps, maxSteps, map) => {
  const positions = new Heap((a, b) => a.heat - b.heat);
  const visited = createVisited(minSteps, maxSteps);

  // Starting position
  positions.push({
    row: 0,
    col: 0,
    rowDir: 0,
    colDir: 0,
    consecutive: 0,
    heat: 0,
  });

  while (positions.length > 0) {
    const pos = positions.pop();

    if (visited.check(pos)) {
      continue;
    }

    if (
      pos.row === map.length - 1 &&
      pos.col === map[0].length - 1 &&
      pos.consecutive >= minSteps
    ) {
      return pos.heat;
    }

    tryDirection(positions, pos, 1, 0, minSteps, maxSteps, map);
    tryDirection(positions, pos, -1, 0, minSteps, maxSteps, map);
    tryDirection(positions, pos, 0, 1, minSteps, maxSteps, map);
    tryDirection(positions, pos, 0, -1, minSteps, maxSteps, map);
  }
  throw new Error("Nothing found.");
};

const main = async () => {
  try {
    const input = (await fs.readFile("input.txt", "utf-8")).trim().split("\n");

    // Creating the map from the input
    const map = input.filter(Boolean).map((line) => line.split("").map(Number));

    // Finding the minimum heat for different step ranges
    const partOne = minHeat(0, 3, map);
    const partTwo = minHeat(4, 10, map);

    console.log("Part 1:", partOne);
    console.log("Part 2:", partTwo);
  } catch (err) {
    throw err;
  }
};

main();
