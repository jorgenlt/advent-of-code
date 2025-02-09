import { readFile } from "fs/promises";

const parseInput = (input) => {
  const register = new Map();

  input.split("\n").forEach((l) => {
    const sueNum = Number(l.match(/\d+/)[0]);
    const properties = l.split(/Sue \d+:\s/)[1].split(", ");
    const propertiesMap = new Map();

    properties.forEach((property) => {
      const [key, value] = property.split(": ");

      propertiesMap.set(key, Number(value));
    });

    register.set(sueNum, propertiesMap);
  });

  return register;
};

const mfcsam = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

const solvePuzzle = (input) => {
  const register = parseInput(input);
  let correctSue = 0;

  register.forEach((properties, sueNum) => {
    let isCandidate = true;

    for (const [prop, value] of properties) {
      if (prop === "cats" || prop === "trees") {
        if (value <= mfcsam[prop]) {
          isCandidate = false;
          break;
        }
      } else if (prop === "pomeranians" || prop === "goldfish") {
        if (value >= mfcsam[prop]) {
          isCandidate = false;
          break;
        }
      } else {
        if (value !== mfcsam[prop]) {
          isCandidate = false;
          break;
        }
      }
    }

    if (isCandidate) {
      correctSue = sueNum;
    }
  });

  return correctSue;
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
