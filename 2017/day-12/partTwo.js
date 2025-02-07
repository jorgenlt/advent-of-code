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
  const globalVisited = new Set();
  const graph = createGraph(input);
  let groupCount = 0;

  for (const key of graph.keys()) {
    if (!globalVisited.has(key)) {
      groupCount++;
    }
    // BFS
    const queue = [key];

    while (queue.length > 0) {
      const vertex = queue.shift();

      if (!globalVisited.has(vertex)) {
        globalVisited.add(vertex);

        for (const neighbor of graph.get(vertex)) {
          if (!globalVisited.has(neighbor)) {
            queue.push(neighbor);
          }
        }
      }
    }
  }

  return groupCount;
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
