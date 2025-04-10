import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input
    .trim()
    .split("\n")
    .map((l) => l.split("").map(Number));
};

const createGridGraph = (grid) => {
  const graph = new Map();
  const height = grid.length;
  const width = grid[0].length;

  const directions = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const current = `${x},${y}`;
      if (!graph.has(current)) graph.set(current, []);

      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (newX < width && newX >= 0 && newY < height && newY >= 0) {
          const neighbor = `${newX},${newY}`;
          const weight = grid[newY][newX];

          if (!graph.has(neighbor)) graph.set(neighbor, []);

          graph.get(current).push({ node: neighbor, weight: grid[newY][newX] });
          graph.get(neighbor).push({ node: current, weight: grid[y][x] });
        }
      }
    }
  }

  return graph;
};

const dijkstra = (graph, start, finish) => {
  const distances = new Map();
  const previous = new Map();
  const priorityQueue = [];
  const path = [];

  // Initialize distances and priority queue
  graph.forEach((_, vertex) => {
    if (vertex === start) {
      distances.set(vertex, 0);
      priorityQueue.push({ node: vertex, priority: 0 });
    } else {
      distances.set(vertex, Infinity);
      priorityQueue.push({ node: vertex, priority: Infinity });
    }
    previous.set(vertex, null);
  });

  const sortQueue = () => {
    priorityQueue.sort((a, b) => a.priority - b.priority);
  };

  while (priorityQueue.length > 0) {
    sortQueue();
    const { node: smallest } = priorityQueue.shift();

    if (smallest === finish) {
      let current = smallest;
      while (previous.get(current)) {
        path.push(current);
        current = previous.get(current);
      }
      path.push(start);
      return path.reverse();
    }

    if (distances.get(smallest) !== Infinity) {
      for (const { node: neighbor, weight } of graph.get(smallest)) {
        const candidate = distances.get(smallest) + weight;

        if (candidate < distances.get(neighbor)) {
          distances.set(neighbor, candidate);
          previous.set(neighbor, smallest);

          const queueItem = priorityQueue.find(
            (item) => item.node === neighbor
          );
          if (queueItem) queueItem.priority = candidate;
        }
      }
    }
  }

  return path;
};

const solvePuzzle = (input) => {
  const grid = parseInput(input);
  const graph = createGridGraph(grid);
  const start = "0,0";
  const finish = `${grid[0].length - 1},${grid.length - 1}`;

  const path = dijkstra(graph, start, finish);

  let totalRisk = 0;

  for (let i = 1; i < path.length; i++) {
    const [x, y] = path[i].split(",").map(Number);
    totalRisk += grid[y][x];
  }

  return totalRisk;
};

const main = async () => {
  try {
    const input = await readFile("input.txt", "utf-8");

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
