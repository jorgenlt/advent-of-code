import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input.split("\n");
};

const initializeRegister = (instructions) => {
  const register = new Map();

  for (let i = 0; i < instructions.length; i++) {
    const x = instructions[i].split(" ")[1];

    if (!register.has(x) && isNaN(x)) {
      register.set(x, 0);
    }
  }

  return register;
};

const solvePuzzle = (input) => {
  const instructions = parseInput(input);

  const register = initializeRegister(instructions);

  let i = 0;
  let sound;

  while (i < instructions.length) {
    const [instruction, x, y] = instructions[i].split(" ");

    switch (instruction) {
      case "snd":
        sound = register.get(x);
        i++;
        break;
      case "set":
        const setValue = !isNaN(y) ? Number(y) : register.get(y);
        register.set(x, setValue);
        i++;
        break;
      case "add":
        const addValue = !isNaN(y) ? Number(y) : register.get(y);
        register.set(x, register.get(x) + addValue);
        i++;
        break;
      case "mul":
        register.set(x, register.get(x) * Number(y));
        i++;
        break;
      case "mod":
        const modValue = !isNaN(y) ? Number(y) : register.get(y);
        register.set(x, register.get(x) % modValue);
        i++;
        break;
      case "rcv":
        if (register.get(x) !== 0) {
          return sound;
        }
        i++;
        break;
      case "jgz":
        const jgzValue = !isNaN(y) ? Number(y) : register.get(y);
        if (register.get(x) > 0) {
          i += jgzValue;
        } else {
          i++;
        }
        break;
      default:
        i++;
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
