import { readFile } from "fs/promises";

const parseInput = (input) => {
  const orbits = new Map();

  input.split("\n").forEach((l) => {
    const [a, b] = l.split(")");

    orbits.set(b, a);
  });

  return orbits;
};

const getPathToRoot = (obj, orbits) => {
  const path = [];
  while (orbits.has(obj)) {
    obj = orbits.get(obj);
    path.push(obj);
  }

  return path;
};

const solvePuzzle = (input) => {
  const orbits = parseInput(input);

  const youPath = getPathToRoot("YOU", orbits);
  const sanPath = getPathToRoot("SAN", orbits);

  let commonAncestor = null;
  let stepsFromYou = 0;
  let stepsFromSan = 0;

  for (let i = 0; i < youPath.length; i++) {
    const ancestor = youPath[i];
    const j = sanPath.indexOf(ancestor);
    if (j !== -1) {
      commonAncestor = ancestor;
      stepsFromYou = i;
      stepsFromSan = j;
      break;
    }
  }

  return stepsFromYou + stepsFromSan;
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
