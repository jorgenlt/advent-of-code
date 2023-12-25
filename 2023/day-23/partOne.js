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
      v: [[1, 0]],
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

    // Depth First Search, with detailed comments

    // We start by creating a Set, `vistedNodes`. This will store all the nodes we've visited.
    // Using a Set instead of an Array for this purpose is more efficient because checking 
    // whether a value exists in a Set is generally faster than checking in an Array.
    let visitedNodes = new Set();

    // Next, we create a Map called `memo`. This will be our memoization table.
    // Memoization is a technique where we store the results of expensive function calls 
    // and reusing them when the same inputs occur again.
    // In this case, we're storing the maximum score that we can get from each point in 
    // the graph.
    // Not really necessary in this puzzle, but it's good practice.
    const memo = new Map();

    // Now we define our main function, depthFirstSearch. An algorithm used to 
    // traverse trees or graphs.
    // It starts at a given node, currentPoint, explores 
    // as far as possible along each branch before backtracking.
    const depthFirstSearch = (currentPoint) => {
      // We convert the `currentPoint` array into a string so that it can be used as a key in our 
      // `Set` and `Map`.
      // This is necessary because JavaScript uses reference equality for arrays, not value 
      // equality, meaning [1, 2] !== [1, 2].
      const pointKey = `${currentPoint[0]},${currentPoint[1]}`;

      // If we have already computed the result for this current point, we simply return it. 
      // This is the essence of memoization.
      if (memo.has(pointKey)) {
        return memo.get(pointKey);
      }

      // The base case for our recursive function: if the current point is the end 
      // tile, we return 0.
      // This signifies that we have found a valid path from the start to the end.
      if (currentPoint[0] === endTile[0] && currentPoint[1] === endTile[1]) {
        return 0;
      }

      // We initialize `maxScore` to negative infinity. This variable will keep track of 
      // the maximum score we can get from the current point.
      let maxScore = Number.NEGATIVE_INFINITY;

      // We add the current point to our Set of visited nodes.
      visitedNodes.add(pointKey);

      // Now we loop over all neighbors of the current point in the graph.
      for (let neighbor of graph[pointKey]) {
        // For each neighbor, we recursively call `depthFirstSearch` function 
        // and add the score of the current edge to the result.
        // If this total is greater than our current `maxScore`, we update `maxScore`.
        maxScore = Math.max(maxScore, depthFirstSearch([neighbor[0], neighbor[1]]) + neighbor[2]);
      }

      // After exploring all neighbors, we remove the current point from our Set of 
      // visited nodes.
      visitedNodes.delete(pointKey);

      // Before the function ends, we store the maximum score that we can get from the 
      // current point in our memoization table.
      // This way, if we encounter this point again in our search, we can simply look 
      // up its score in the table rather than recomputing it.
      memo.set(pointKey, maxScore);

      // Return the maximum score.
      return maxScore;
    };

    console.log(depthFirstSearch(startTile));
  } catch (err) {
    console.error(err);
  }
};

main();
