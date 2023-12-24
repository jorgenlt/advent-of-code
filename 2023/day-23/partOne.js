import fs from "fs/promises";

// Directions for navigation [-1, 0] is up, [1, 0] is down,
// [0, 1] is right, and [0, -1] is left.
const DIRECTIONS = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

// Function to calculate the number of valid neighbors around
// a given point (i, j) in a 2D grid.
const getNeighbors = (input, i, j) => {
  let neighbors = 0;
  for (let [y, x] of DIRECTIONS) {
    y += i;
    x += j;

    // Checking if the new coordinates are within the grid
    // and not forest ("#")
    if (
      y >= 0 &&
      y < input.length &&
      x >= 0 &&
      x < input[0].length &&
      input[y][x] != "#"
    ) {
      neighbors++;
    }
  }
  return neighbors;
};

const main = async () => {
  try {
    const input = (await fs.readFile("input.txt", "utf8")).trim().split("\n");

    // Start point of the path
    const startTile = [0, input[0].indexOf(".")];

    // End point of the path
    const endTile = [input.length - 1, input[input.length - 1].indexOf(".")];

    const points = [startTile, endTile];

    // Loop through each line to find points where there
    // are more than two neighbors.
    input.forEach((line, i) => {
      for (let j = 0; j < line.length; j++) {
        if (line[j] === "#") continue;
        if (getNeighbors(input, i, j) > 2) {
          points.push([i, j]);
        }
      }
    });

    // Define directions for each type of tile.
    const directions = {
      "^": [[-1, 0]],
      "v": [[1, 0]],
      ">": [[0, 1]],
      "<": [[0, -1]],
      ".": [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
      ],
    };

    // Initialize the graph as an empty object.
    let graph = {};

    // Add all points to the graph.
    for (let point of points) {
      graph[point] = [];
    }

    // Loop through each point and build the graph
    // by exploring all possible paths from that point.
    for (let [sr, sc] of points) {
      let stack = [];
      stack.push([0, sr, sc]);

      let seen = new Set();
      seen.add(`${sr},${sc}`);

      while (stack.length > 0) {
        let [n, r, c] = stack.pop();
        let contain = points.some((v) => v[0] === r && v[1] === c);
        if (n != 0 && contain) {
          graph[`${sr},${sc}`].push([r, c, n]);
          continue;
        }

        for (let [dr, dc] of directions[input[r][c]]) {
          let nr = r + dr;
          let nc = c + dc;

          if (
            nr >= 0 &&
            nr < input.length &&
            nc >= 0 &&
            nc < input[0].length &&
            input[nr][nc] != "#" &&
            !seen.has(`${nr},${nc}`)
          ) {
            stack.push([n + 1, nr, nc]);
            seen.add(`${nr},${nc}`);
          }
        }
      }
    }

    // Initialize a set to keep track of visited nodes.
    let seen = new Set();

    // Initialize memoization table
    const memo = new Map();

    // Function to perform depth first search on the graph
    const dfs = (point) => {
      // Check if point has already been computed
      if (memo.has(`${point[0]},${point[1]}`)) {
        return memo.get(`${point[0]},${point[1]}`);
      }

      // Base case: If the end tile is reached, return 0
      if (point[0] === endTile[0] && point[1] === endTile[1]) {
        return 0;
      }

      let max = Number.NEGATIVE_INFINITY;

      seen.add(`${point[0]},${point[1]}`);

      for (let nx of graph[`${point[0]},${point[1]}`]) {
        max = Math.max(max, dfs([nx[0], nx[1]]) + nx[2]);
      }

      seen.delete(`${point[0]},${point[1]}`);

      // Store result in memoization table before returning
      memo.set(`${point[0]},${point[1]}`, max);

      return max;
    };

    console.log(dfs(startTile));
  } catch (err) {
    console.error(err);
  }
};

main();
