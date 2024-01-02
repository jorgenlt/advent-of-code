import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map(Number);

    const instructions = [...input];

    let stepsCount = 0;
    let offset = 0;

    while (offset >= 0 && offset < instructions.length) {
      const currentInstruction = instructions[offset];
      
      instructions[offset]++;
      
      offset = offset + currentInstruction;

      stepsCount++;
    }

    console.log(stepsCount); //  354121
  } catch (err) {
    console.error(err);
  }
};

main();
