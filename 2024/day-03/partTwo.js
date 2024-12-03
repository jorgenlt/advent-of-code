import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    const regex = /mul\(\d+,\d+\)|don't\(\)|do\(\)/gm;
    const instructions = input.match(regex);

    let sum = 0;
    let validMul = true;

    for (const instruction of instructions) {
      if (instruction === "do()") {
        validMul = true;
      } else if (instruction === "don't()") {
        validMul = false;
      } else if (validMul) {
        const [num1, num2] = instruction.match(/\d+/g).map(Number);
        sum += num1 * num2;
      }
    }

    console.log(sum);
  } catch (err) {
    console.error(err);
  }
};

main();
