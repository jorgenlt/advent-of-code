import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input.split("\n").map((l) => {
    const [instruction, number] = l.split(" ");

    return [instruction, Number(number)];
  });
};

const solvePuzzle = (input) => {
  const instructions = parseInput(input);

  let acc = 0;

  let i = 0;

  const visited = new Set();

  while (i < instructions.length) {
    const [instruction, value] = instructions[i];

    if (visited.has(i)) {
      return acc;
    } else {
      visited.add(i);
    }

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
