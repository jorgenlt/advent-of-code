import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input.trim().split("\n");
};

const largestJoltage = (bank) => {
  let best = 0;

  for (let i = 0; i < bank.length; i++) {
    const a = Number(bank[i]);

    for (let j = i + 1; j < bank.length; j++) {
      const b = Number(bank[j]);

      const joltage = Number(bank[i] + bank[j]);

      if (joltage > best) {
        best = joltage;
      }
    }
  }

  return best;
};

const solvePuzzle = (input) => {
  const banks = parseInput(input);

  let sum = 0;

  for (const bank of banks) {
    sum += largestJoltage(bank);
  }

  return sum;
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
