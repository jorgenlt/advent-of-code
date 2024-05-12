import { readFile } from "fs/promises";

const doesReact = (unit, adjacentUnit) => {
  if (
    unit === adjacentUnit.toLowerCase() ||
    unit === adjacentUnit.toUpperCase()
  ) {
    return true;
  }
  return false;
};

const removeAdjacentChars = (str, index) => {
  return str.slice(0, index) + str.slice(index + 2);
};

const reaction = (polymer) => {
  let reacted = true;

  while (reacted) {
    reacted = false;

    for (let i = 0; i < polymer.length - 1; i++) {
      const unit = polymer[i];
      const adjacentUnit = polymer[i + 1];

      if (doesReact(unit, adjacentUnit)) {
        polymer = removeAdjacentChars(polymer, i);

        reacted = true;

        break;
      }
    }
  }
  return polymer.length;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    const result = reaction(input);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

main();

// Part1: 10564 (180ms)
// Part2: 6336 (2903ms)
