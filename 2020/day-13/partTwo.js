import { readFile } from "fs/promises";

const parseInput = (input) => {
  const [section1, section2] = input.split("\n");

  return section2
    .split(",")
    .map((bus, index) => (bus === "x" ? null : [BigInt(bus), BigInt(index)]))
    .filter(Boolean);
};

const solvePuzzle = (input) => {
  const buses = parseInput(input);

  // Solving using Chinese Remainder Theorem

  // Initialize the timestamp and step using bigint
  let timestamp = 0n;
  let step = 1n;

  for (const [busId, offset] of buses) {
    // Find the timestamp such that (timestamp + offset) is divisible by busId
    while ((timestamp + offset) % busId !== 0n) {
      timestamp += step;
    }
    // Update the step
    step *= busId;
  }

  return timestamp.toString();
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
