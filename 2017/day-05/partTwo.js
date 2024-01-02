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
      // Save current offset in a variable
      const currentOffset = offset;

      // Add instruction at offset to offset.
      offset += instructions[offset];

      if (instructions[currentOffset] >= 3) {
        instructions[currentOffset] += -1;
      } else {
        instructions[currentOffset] += 1;
      }

      stepsCount++;
    }

    console.log(stepsCount); //  27283023
  } catch (err) {
    console.error(err);
  }
};

main();
