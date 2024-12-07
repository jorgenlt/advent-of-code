import { readFile } from "fs/promises";

const findGuardLocation = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "^") return [i, j];
    }
  }
};

const isLoop = (grid, startPos) => {
  const rows = grid.length;
  const cols = grid[0].length;

  const directions = [
    [-1, 0], // up
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
  ];

  let guardPosition = startPos;
  let guardDirection = 0;
  const visited = new Set();

  while (true) {
    let [deltaRow, deltaCol] = directions[guardDirection];
    let [newRow, newColumn] = [
      guardPosition[0] + deltaRow,
      guardPosition[1] + deltaCol,
    ];

    // Check if guard is out of bounds
    if (newRow < 0 || newRow >= rows || newColumn < 0 || newColumn >= cols) {
      return false; // No loop detected
    }

    if (grid[newRow][newColumn] === "#") {
      // Obstacle found, turn right
      guardDirection = (guardDirection + 1) % 4;
    } else {
      // Move forward
      guardPosition = [newRow, newColumn];
      const positionKey = `${guardPosition[0]},${guardPosition[1]},${guardDirection}`;

      // Check if current position (with current direction) has been visited before
      // return true if it has (loop detected), else register in visited
      if (visited.has(positionKey)) {
        return true; // Loop detected
      } else {
        visited.add(positionKey);
      }
    }
  }
};

const main = async () => {
  try {
    const grid = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((line) => line.split(""));

    const guardPosition = findGuardLocation(grid);

    let loopCount = 0;

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        // Continue if positoin is guards starting position
        if (r === guardPosition[0] && c === guardPosition[1]) continue;

        // Add obstacle at current position
        const tempSymbol = grid[r][c]; // Store original symbol
        grid[r][c] = "#";

        // Simulate and count
        if (isLoop(grid, guardPosition)) {
          loopCount++;
        }

        // Replace with original symbol
        grid[r][c] = tempSymbol;
      }
    }

    console.log(loopCount);
  } catch (err) {
    console.error(err);
  }
};

main();
