import { readFile } from "fs/promises";
import findCommonItems from "../../utils/findCommonItems.js";
import createNumbersArray from "../../utils/createNumbersArray.js";

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

const doesOverlap = (arr1, arr2) => {
  if (findCommonItems(arr1, arr2).length > 0) {
    return true;
  }

  return false;
};

const main = async () => {
  try {
    const input = await readFile("input.txt", "utf-8");

    const assignmentsPairs = parseInput(input);

    const overlapCount = assignmentsPairs.reduce((count, pair) => {
      const { elf1, elf2 } = pair;

      const elf1Ids = createNumbersArray(elf1.from, elf1.to);
      const elf2Ids = createNumbersArray(elf2.from, elf2.to);

      if (doesOverlap(elf1Ids, elf2Ids)) {
        count++;
      }

      return count;
    }, 0);

    console.log(overlapCount);
  } catch (err) {
    console.error(err);
  }
};

main();
