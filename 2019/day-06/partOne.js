import { readFile } from "fs/promises";

const parseInput = (input) => {
  const orbits = new Map();

  input.split("\n").forEach((l) => {
    const [a, b] = l.split(")");

    orbits.set(b, a);
  });

  return orbits;
};

const solvePuzzle = (input) => {
  const orbits = parseInput(input);

  let totalOrbits = 0;

  for (const [child, parent] of orbits) {
    let current = parent;

    while (current) {
      totalOrbits++;
      current = orbits.get(current);
    }
  }

  return totalOrbits;
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
