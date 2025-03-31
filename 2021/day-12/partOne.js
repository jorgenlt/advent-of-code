import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input
    .trim()
    .split("\n")
    .map((e) => e.split("-"));
};

const createGraph = (input) => {
  const connections = parseInput(input);

  const graph = new Map();

  for (const [a, b] of connections) {
    if (!graph.has(a)) {
      graph.set(a, [b]);
    } else {
      graph.set(a, [...graph.get(a), b]);
    }

    if (!graph.has(b)) {
      graph.set(b, [a]);
    } else {
      graph.set(b, [...graph.get(b), a]);
    }
  }

  return graph;
};

const isSmallCave = (cave) => cave.toLowerCase() === cave;

const dfs = (node, graph, visited) => {
  if (node === "end") return 1;

  let paths = 0;

  if (isSmallCave(node)) visited.add(node);

  for (const neighbour of graph.get(node)) {
    if (isSmallCave(neighbour) && visited.has(neighbour)) continue;
    paths += dfs(neighbour, graph, visited);
  }

  if (isSmallCave(node)) visited.delete(node);

  return paths;
};

const solvePuzzle = (input) => {
  const graph = createGraph(input);

  const result = dfs("start", graph, new Set());

  return result;
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
