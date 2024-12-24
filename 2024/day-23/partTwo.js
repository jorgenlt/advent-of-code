import { readFile } from "fs/promises";

const parseInput = (input) => input.split("\n").map((e) => e.split("-"));

const createConnectionsMap = (connections) => {
  const map = new Map();

  connections.forEach(([c1, c2]) => {
    if (!map.has(c1)) {
      map.set(c1, []);
    }
    map.get(c1).push(c2);

    if (!map.has(c2)) {
      map.set(c2, []);
    }
    map.get(c2).push(c1);
  });

  return map;
};

// Bron-Kerbosch algorithm
const bronKerbosch = (R, P, X, cliques, graph) => {
  if (P.size === 0 && X.size === 0) {
    cliques.push(new Set(R));
    return;
  }

  const PArray = Array.from(P);
  for (const v of PArray) {
    const neighbors = new Set(graph.get(v) || []);
    bronKerbosch(
      new Set([...R, v]),
      new Set([...P].filter((x) => neighbors.has(x))),
      new Set([...X].filter((x) => neighbors.has(x))),
      cliques,
      graph
    );
    P.delete(v);
    X.add(v);
  }
};

const findLargestClique = (graph) => {
  const nodes = Array.from(graph.keys());
  const cliques = [];

  bronKerbosch(new Set(), new Set(nodes), new Set(), cliques, graph);

  return cliques.reduce(
    (maxClique, clique) =>
      clique.size > maxClique.length ? Array.from(clique) : maxClique,
    []
  );
};

const solvePuzzle = (input) => {
  const graph = createConnectionsMap(parseInput(input));
  const password = findLargestClique(graph).join(",");

  return password;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error("Error reading or processing the file:", err.message);
  }
};

main();
