import { readFile } from "fs/promises";

const doesReact = (unit, adjacentUnit) => {
  if (unit !== adjacentUnit) {
    if (
      unit === adjacentUnit.toLowerCase() ||
      unit === adjacentUnit.toUpperCase()
    ) {
      return true;
    }
  }
  return false;
};

const removeAdjacentChars = (str, index) => {
  return str.slice(0, index) + str.slice(index + 2);
};

const removeUnitType = (polymer, type) => {
  const regex = new RegExp(type, "gi");
  return polymer.replace(regex, "");
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
    const polymer = (await readFile("input.txt", "utf-8")).trim();

    const unitTypes = new Set(polymer.toLowerCase());

    let shortestLength = Infinity;

    unitTypes.forEach((type) => {
      const newPolymer = removeUnitType(polymer, type);

      const newPolymerLength = reaction(newPolymer);

      console.log("🚀 ~ main ~ newPolymerLength:", newPolymerLength);

      if (newPolymerLength < shortestLength) {
        shortestLength = newPolymerLength;
      }
    });

    console.log(shortestLength);
  } catch (err) {
    console.error(err);
  }
};

main();
