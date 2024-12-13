// Part 1 and 2

import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input.split("\n\n").map((d) => {
    const [a, b, p] = d
      .split("\n")
      .map((line) => line.match(/\d+/g).map(Number));
    return {
      a: { x: a[0], y: a[1] },
      b: { x: b[0], y: b[1] },
      p: { x: p[0], y: p[1] },
    };
  });
};

const intersection = (a1, b1, c1, a2, b2, c2) => {
  // Calculate the denominator for both 'a' and 'b'
  const denominator = a2 * b1 - a1 * b2;

  // Check if the denominator is zero
  if (denominator === 0) return undefined;

  // Calculate 'a' using the determinant method
  const a = (a1 * c2 - a2 * c1) / denominator;

  // Check if 'a' is positive and an integer before calculating 'b'
  if (a <= 0 || !Number.isInteger(a)) return undefined;

  // Then calculate 'b'
  const b = (b1 * a + c1) / a1;

  // Return the result only if 'b' is positive and an integer
  if (b > 0 && Number.isInteger(b)) return [a, b];

  return undefined;
};

// Function to calculate tokens for a single machine
const calculateTokens = (machine, d) => {
  const { a, b, p } = machine;

  const { x: bx, y: by } = b;
  const { x: ax, y: ay } = a;
  const { x: px, y: py } = p;

  const intersectionResult = intersection(bx, -ax, px + d, by, -ay, py + d);

  // If there is a valid intersection, compute token value
  if (intersectionResult) {
    const [r0, r1] = intersectionResult;
    return r0 * 3 + r1;
  }

  // Return zero if no valid intersection
  return 0;
};

// Function to calculate the minimum tokens for all machines
const calculateMinimumTokens = (d = 0, machines) => {
  let totalTokens = 0;

  // Loop through each machine and accumulate tokens
  for (let i = 0; i < machines.length; i++) {
    totalTokens += calculateTokens(machines[i], d);
  }

  return totalTokens;
};

const solvePuzzle = (input) => {
  const clawMachines = parseInput(input);

  const resultPart1 = calculateMinimumTokens(0, clawMachines);
  console.log("resultPart1:", resultPart1);

  const resultPart2 = calculateMinimumTokens(10000000000000, clawMachines);
  console.log("resultPart2:", resultPart2);
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    solvePuzzle(input);
  } catch (err) {
    console.error(err);
  }
};

main();
