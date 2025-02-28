import { readFile } from "fs/promises";

const isPositionValid = (map, row, col) => {
  return row >= 0 && row < map.length && col >= 0 && col < map[0].length;
};

const getTrailHeads = (map) => {
  const trailHeads = [];

  for (let r = 0; r < map.length; r++) {
    for (let c = 0; c < map[r].length; c++) {
      if (map[r][c] === 0) {
        trailHeads.push([r, c]);
      }
    }
  }

  return trailHeads;
};

const bfs = (map, startRow, startCol) => {
  // Changes from Part 1:
  //    * Changed nines to an array to register all nines
  //    * Commented out "Continue if already visited"

  const queue = [[startRow, startCol]]; // [row, col]
  const visited = new Set();
  const nines = [];

  while (queue.length > 0) {
    const [row, col] = queue.shift();
    const key = `${row},${col}`;

    // Explore neighbors in 4 directions (up, down, left, right)
    const directions = [
      [row - 1, col], // up
      [row + 1, col], // down
      [row, col - 1], // left
      [row, col + 1], // right
    ];

    // Continue if already visited
    // if (visited.has(key)) continue;

    visited.add(key);

    const currentHeight = map[row][col];

    // If this is a "9", add it to list of nines
    if (currentHeight === 9) {
      nines.push(key);
    }

    for (const [newRow, newCol] of directions) {
      if (!isPositionValid(map, newRow, newCol)) continue;

      const neighborHeight = map[newRow][newCol];

      // Valid neighbors must increase by exactly 1 in height
      if (neighborHeight === currentHeight + 1) {
        queue.push([newRow, newCol]);
      }
    }
  }

  // Return the number of TOTAL "9" positions reachable from this trailhead
  return nines.length;
};

const main = async () => {
  try {
    const map = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((line) => line.split("").map(Number));

    const trailHeads = getTrailHeads(map);

    let totalScore = 0;

    for (const [row, col] of trailHeads) {
      totalScore += bfs(map, row, col);
    }

    console.log(totalScore);
  } catch (err) {
    console.error(err);
  }
};

main();
