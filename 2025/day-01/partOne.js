import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input.split("\n");
};

const turnDial = (current, direction, steps) => {
  if (steps <= 0) return current;

  const size = 100;
  const delta = direction === "L" ? -1 : 1;

  return (((current + delta * steps) % size) + size) % size; // Wrap around
};

const solvePuzzle = (input) => {
  const instructions = parseInput(input);

  let current = 50;
  let zeroCount = 0;

  for (let instruction of instructions) {
    const direction = instruction[0];
    const steps = Number(instruction.slice(1));

    let newPosition = turnDial(current, direction, steps);

    if (newPosition === 0) {
      zeroCount++;
    }

    current = newPosition;
  }

  return zeroCount;
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
