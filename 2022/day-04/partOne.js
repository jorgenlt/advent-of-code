import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input
    .trim()
    .split("\n")
    .map((e) => {
      const [elf1, elf2] = e.split(",").map((ids) => {
        const [from, to] = ids.split("-").map(Number);
        return {
          from,
          to,
        };
      });
      return {
        elf1,
        elf2,
      };
    });
};

const main = async () => {
  try {
    const input = await readFile("input.txt", "utf-8");

    const assignmentsPairs = parseInput(input);

    let fullyContainCount = 0;

    assignmentsPairs.forEach((pair) => {
      const { elf1, elf2 } = pair;

      if (
        (elf1.from <= elf2.from && elf1.to >= elf2.to) ||
        (elf2.from <= elf1.from && elf2.to >= elf1.to)
      ) {
        fullyContainCount++;
      }
    });

    console.log(fullyContainCount);
  } catch (err) {
    console.error(err);
  }
};

main();
