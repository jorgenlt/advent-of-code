import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input
    .trim()
    .split("\n")
    .map((l) => l.split("").map(Number));
};

const createGraph = () => new Map();

const addVertex = (graph, vertex) => {
  if (!graph.has(vertex)) {
    graph.set(vertex, []);
  }
};

const addEdge = (graph, vertex1, vertex2, weight) => {
  graph.get(vertex1).push({ node: vertex2, weight });
  graph.get(vertex2).push({ node: vertex1, weight });
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

  return path; // Return an empty array if no path is found
};

const solvePuzzle = (input) => {
  const grid = parseInput(input);
  console.log(grid);
};

const main = async () => {
  try {
    const input = await readFile("test.txt", "utf-8");

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
