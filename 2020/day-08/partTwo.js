import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input.split("\n").map((l) => {
    const [instruction, number] = l.split(" ");

    return [instruction, Number(number)];
  });
};

const getIndexes = (instructions) => {
  const indexes = [];

  for (let i = 0; i < instructions.length; i++) {
    const [operation] = instructions[i];

    if (operation === "nop" || operation === "jmp") {
      indexes.push(i);
    }
  }

  return indexes;
};

const solvePuzzle = (input) => {
  const instructions = parseInput(input);

  const candidateIndexes = getIndexes(instructions);

  for (const idx of candidateIndexes) {
    const instructionsCopy = instructions.map(([op, num]) => [op, num]);

    instructionsCopy[idx][0] =
      instructionsCopy[idx][0] === "nop" ? "jmp" : "nop";

    let acc = 0;
    let i = 0;
    const visited = new Set();

    while (i < instructionsCopy.length) {
      if (visited.has(i)) {
        break;
      }
      visited.add(i);

      const [instruction, value] = instructionsCopy[i];

      switch (instruction) {
        case "acc":
          acc += value;
          i++;
          break;
        case "jmp":
          i += value;
          break;
        case "nop":
          i++;
          break;
        default:
          console.error("Invalid operation.");
          break;
      }
    }

    if (i === instructionsCopy.length) {
      return acc;
    }
  }
};

const main = async () => {
  try {
    const input = (await readFile("test.txt", "utf-8")).trim();

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
