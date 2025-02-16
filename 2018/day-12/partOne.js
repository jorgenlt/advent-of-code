import { readFile } from "fs/promises";

const parseInput = (input) => {
  const [section1, section2] = input.split("\n\n");

  const initialState = section1.slice(15).trim().split("");
  const nextGen = new Map();

  section2
    .trim()
    .split("\n")
    .forEach((l) => {
      const [key, plant] = l.split(" => ");

      nextGen.set(key, plant === "#");
    });

  return {
    initialState,
    nextGen,
  };
};

const calcPotSum = (plants, offset) => {
  return plants.reduce((sum, plant, idx) => {
    if (plant === "#") {
      sum += idx + offset;
    }
    return sum;
  }, 0);
};

const simulateGeneration = (currentPlants, rules, offset) => {
  const padded = "...." + currentPlants.join("") + "....";
  const newOffset = offset - 2;
  let nextPlants = [];

  for (let i = 2; i < padded.length - 2; i++) {
    const key = padded.slice(i - 2, i + 3);
    nextPlants.push(rules.get(key) ? "#" : ".");
  }
  return { nextPlants, newOffset };
};

const solvePuzzle = (input) => {
  const { initialState, nextGen } = parseInput(input);

  let plants = initialState;
  let offset = 0;

  for (let gen = 0; gen < 20; gen++) {
    const result = simulateGeneration(plants, nextGen, offset);
    plants = result.nextPlants;
    offset = result.newOffset;
  }

  return calcPotSum(plants, offset);
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
