import fs from "fs/promises";

const main = async () => {
  try {
    const input = await fs.readFile("input.txt", "utf8");
    const map = input.trim().split("\n");

    const dirs = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    let startRow;
    let startCol;
    const steps = 64;

    // Find start position
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === "S") {
          startRow = i;
          startCol = j;
        }
      }
    }

    // Setup visited plots
    let visited = new Set();
    visited.add(startRow + "," + startCol);

    // BFS queue
    let queue = [[startRow, startCol, 0]];

    // Explore map
    while (queue.length > 0) {
      const [row, col, currentSteps] = queue.shift();

      // Check all directions
      for (let [dr, dc] of dirs) {
        let r = row + dr;
        let c = col + dc;

        // Validate indices
        if (
          r >= 0 &&
          r < map.length &&
          c >= 0 &&
          c < map[row].length &&
          map[r][c] === "."
        ) {
          let key = r + "," + c;
          if (!visited.has(key)) {
            visited.add(key);
            queue.push([r, c, currentSteps + 1]);
          }
        }
      }

      // Stop when steps reached
      if (currentSteps === steps) break;
    }

    // Return count of visited
    console.log(visited.size);
  } catch (err) {
    console.error(err);
  }
};

main();
