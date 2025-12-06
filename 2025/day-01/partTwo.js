import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input.split("\n");
};

const turnDial = (current, direction, steps) => {
  if (steps <= 0) return { current, zeroCrossings: 0 };

  let zeroCrossings = 0;
  const size = 100;
  const delta = direction === "L" ? -1 : 1;

  for (let i = 0; i < steps; i++) {
    current = (((current + delta) % size) + size) % size;

    if (current === 0) {
      zeroCrossings++;
    }
  }

  const newPosition = current;

  return { newPosition, zeroCrossings };
};

const solvePuzzle = (input) => {
  const instructions = parseInput(input);

  let current = 50;
  let crossings = 0;

  for (let instruction of instructions) {
    const direction = instruction[0];
    const steps = Number(instruction.slice(1));
    const { newPosition, zeroCrossings } = turnDial(current, direction, steps);

    crossings += zeroCrossings;

    current = newPosition;
  }

  return crossings;
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
