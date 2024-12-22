import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input.split("\n").map(Number);
};

const mix = (secretNumber, value) => secretNumber ^ value;

const prune = (secretNumber) => {
  const modulus = 16777216;
  const modded = secretNumber % modulus;
  return modded < 0 ? modded + modulus : modded;
};

const getNextSecretNumber = (secretNumber) => {
  // Calculate the result of multiplying the secret number by 64.
  // Then, mix this result into the secret number.
  // Finally, prune the secret number.
  const a = prune(mix(secretNumber, secretNumber * 64));

  // Calculate the result of dividing the secret number by 32.
  // Round the result down to the nearest integer.
  // Then, mix this result into the secret number. Finally, prune the secret number.
  const b = prune(mix(a, Math.floor(a / 32)));

  // Calculate the result of multiplying the secret number by 2048.
  // Then, mix this result into the secret number.
  // Finally, prune the secret number.
  const c = prune(mix(b, b * 2048));

  return c;
};

const getFinalSecretNumber = (initialNumber, iterations) => {
  let secretNumber = initialNumber;

  for (let i = 0; i < iterations; i++) {
    secretNumber = getNextSecretNumber(secretNumber);
  }

  return secretNumber;
};

const solvePuzzle = (input) => {
  return parseInput(input)
    .map((initialNumber) => getFinalSecretNumber(initialNumber, 2000))
    .reduce((acc, curr) => acc + curr, 0);
};

const main = async () => {
  try {
    const input = await readFile("input.txt", "utf-8");

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
