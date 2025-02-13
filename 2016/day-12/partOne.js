import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input.split("\n");
};

const solvePuzzle = (input) => {
  const instructions = parseInput(input);

  const register = new Map([
    ["a", 0],
    ["b", 0],
    ["c", 0],
    ["d", 0],
  ]);

  let i = 0;

  while (i < instructions.length) {
    const [instruction, x, y] = instructions[i].split(" ");

    switch (instruction) {
      case "cpy":
        const cpyValue = !isNaN(x) ? Number(x) : register.get(x);
        register.set(y, cpyValue);
        i++;
        break;
      case "inc":
        register.set(x, register.get(x) + 1);
        i++;
        break;
      case "dec":
        register.set(x, register.get(x) - 1);
        i++;
        break;
      case "jnz":
        const jnzValue = !isNaN(x) ? Number(x) : register.get(x);
        if (jnzValue !== 0) {
          i += Number(y);
        } else {
          i++;
        }
        break;
      default:
        i++;
        break;
    }
  }

  return register.get("a");
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
