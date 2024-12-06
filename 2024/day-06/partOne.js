import { readFile } from "fs/promises";

const findGuardLocation = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "^") return [i, j];
    }
  }
};

const main = async () => {
  try {
    const grid = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((line) => line.split(""));
    const rows = grid.length;
    const cols = grid[0].length;

    const directions = [
      [-1, 0], // up
      [0, 1], // right
      [1, 0], // down
      [0, -1], // left
    ];

    // Find initial position and direction of the guard
    let guardPosition = findGuardLocation(grid);

    let guardDirection = 0;

    const visited = new Set();
    visited.add(guardPosition.join(","));

    while (true) {
      let [deltaRow, deltaCol] = directions[guardDirection];
      let [newRow, newColumn] = [
        guardPosition[0] + deltaRow,
        guardPosition[1] + deltaCol,
      ];

      // Check if guard is out of bounds
      if (newRow < 0 || newRow >= rows || newColumn < 0 || newColumn >= cols) {
        break;
      }

      if (grid[newRow][newColumn] === "#") {
        // Turn right
        guardDirection = (guardDirection + 1) % 4;
      } else {
        // Move forward
        guardPosition = [newRow, newColumn];
        visited.add(guardPosition.join(","));
      }
    }

    console.log(visited.size);
  } catch (err) {
    console.error(err);
  }
};

main();
