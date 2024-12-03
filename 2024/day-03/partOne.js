import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    const regex = /mul\(\d+,\d+\)/gm;
    const instructions = input.match(regex);

    const result = instructions.reduce((count, instruction) => {
      const [num1, num2] = instruction.match(/\d+/g).map(Number);

      return count + num1 * num2;
    }, 0);

    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

main();
