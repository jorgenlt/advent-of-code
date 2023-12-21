import fs from "fs/promises";

const main = async () => {
  try {
    const input = await fs.readFile("test.txt", "utf8");

    // Map of plots
    const map = input.split("\n");

    console.log(map);

    // Get start position
    const startPos = map.indexOf("S");
    const startRow = Math.floor(startPos / map[0].length);
    const startCol = startPos % map[0].length;

    // Directions array
    const dirs = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    // Visited plots
    let visited = new Set();
    visited.add(startPos);

    // BFS queue
    let queue = [[startRow, startCol, 0]];

    // Search 64 steps
    while (queue.length > 0) {
      const [row, col, steps] = queue.shift();

      // Check if within steps
      if (steps === 64) break;

      // Check neighbors
      for (let [dr, dc] of dirs) {
        let r = row + dr;
        let c = col + dc;

        // Within bounds & plot & unvisited
        if (
          r >= 0 &&
          r < map.length &&
          c >= 0 &&
          c < map[0].length &&
          map[r][c] === "." &&
          !visited.has(r * map[0].length + c)
        ) {
          visited.add(r * map[0].length + c);
          queue.push([r, c, steps + 1]);
        }
      }
    }

    // Get final visited count
    console.log(visited.size);
    console.log(visited)
  } catch (err) {
    console.error(err);
  }
};

main();
