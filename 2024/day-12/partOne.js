import { readFile } from "fs/promises";

const isWithinBounds = (row, col, grid) => {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
};

const main = async () => {
  try {
    const grid = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((e) => e.split(""));

    const rows = grid.length;
    const cols = grid[0].length;

    const directions = [
      [0, 1], // right
      [1, 0], // down
      [0, -1], // left
      [-1, 0], // up
    ];

    // Visited coordinates (cells)
    const visited = new Set();

    let totalPrice = 0;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Check if the current cell has not been visited
        if (!visited.has(`${row},${col}`)) {
          const regionType = grid[row][col];

          let areaCount = 0;
          let perimeterCount = 0;

          const queue = []; // BFS queue

          queue.push([row, col]); // Add current row and col to the queue

          visited.add(`${row},${col}`); // Mark current cell as visited

          // Start BFS
          while (queue.length > 0) {
            const [row, col] = queue.shift(); // Get the next cell in the queue and also remove it from the queue

            areaCount++;

            // Explore all four possible directions
            directions.forEach(([dx, dy]) => {
              const newRow = row + dx;
              const newCol = col + dy;

              // Check if the neighboring cell is within bounds and of the same region type
              if (
                isWithinBounds(newRow, newCol, grid) &&
                grid[newRow][newCol] === regionType
              ) {
                // If the neighboring cell is not visited, add it to the queue and mark as visited
                if (!visited.has(`${newRow},${newCol}`)) {
                  queue.push([newRow, newCol]);
                  visited.add(`${newRow},${newCol}`);
                }
              } else {
                perimeterCount++;
              }
            });
          }

          totalPrice += areaCount * perimeterCount;
        }
      }
    }

    console.log(totalPrice);
  } catch (err) {
    console.error(err);
  }
};

main();
