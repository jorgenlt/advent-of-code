import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input.split("\n").map((e) => e.split("-"));
};

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

const solvePuzzle = (input) => {
  const connections = parseInput(input);

  const connectionsMap = createConnectionsMap(connections);

  const setsOfThree = new Set();

  connectionsMap.forEach((connections, c1) => {
    connections.forEach((c2, i) => {
      const c2Connections = connectionsMap.get(c2);

      // If the connections of c2 includes any of the connections
      // of c1 there are a set of three computers; c1, c2, c3
      connections.slice(0, i).forEach((c3) => {
        if (c2Connections.includes(c3)) {
          const set = [c1, c2, c3].sort().join(",");

          // If the set has a computer that starts with 't',
          // add it to setsOfThree
          if (/t[a-z]/.test(set)) setsOfThree.add(set);
        }
      });
    });
  });

  return setsOfThree.size;
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
