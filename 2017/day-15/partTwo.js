import { readFile } from "fs/promises";
import decimalToBinary from "../../utils/decimalToBinary.js";

const parseInput = (input) => {
  return input.match(/\d+/g).map(Number);
};

const generatorA = (value) => {
  const generatorFactor = 16807;
  const divisor = 2147483647;

  do {
    value = (value * generatorFactor) % divisor;
  } while (value % 4 !== 0);

  return value;
};

const generatorB = (value) => {
  const generatorFactor = 48271;
  const divisor = 2147483647;

  do {
    value = (value * generatorFactor) % divisor;
  } while (value % 8 !== 0);

  return value;
};

const isMatch = (a, b) => {
  const lowest16BitsA = a.slice(a.length - 16);
  const lowest16BitsB = b.slice(b.length - 16);

  return lowest16BitsA === lowest16BitsB;
};

const solvePuzzle = (input) => {
  let [valueA, valueB] = parseInput(input);

  let pairsCount = 0;

  for (let i = 0; i < 5000000; i++) {
    const newValueA = generatorA(valueA);
    const newValueB = generatorB(valueB);

    const binaryA = decimalToBinary(newValueA);
    const binaryB = decimalToBinary(newValueB);

    if (isMatch(binaryA, binaryB)) {
      pairsCount++;
    }

    valueA = newValueA;
    valueB = newValueB;
  }

  return pairsCount;
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
