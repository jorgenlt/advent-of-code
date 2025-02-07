import { readFile } from "fs/promises";

const createGraph = (input) => {
  const graph = new Map();

  input.split("\n").forEach((l) => {
    const numbers = l.match(/\d+/g).map(Number);
    const programId = numbers.shift();

    graph.set(programId, numbers);
  });

  return graph;
};

const solvePuzzle = (input) => {
  // BFS
  const graph = createGraph(input);
  const visited = new Set();
  const queue = [0];
  const connections = [];

  while (queue.length > 0) {
    const vertex = queue.shift();

    if (!visited.has(vertex)) {
      visited.add(vertex);
      connections.push(vertex);

      for (const neighbor of graph.get(vertex)) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      }
    }
  }

  return connections.length;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
