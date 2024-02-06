import { readFile } from "fs/promises";
import createLetterNumberMapping from "../../utils/createLetterNumberMapping.js";

const PRIORITIES = createLetterNumberMapping();

const main = async () => {
  try {
    const rucksacks = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((rucksack) => {
        rucksack = rucksack.split("");
        const compartment1 = rucksack.slice(0, rucksack.length / 2);
        const compartment2 = rucksack.slice(
          rucksack.length / 2,
          rucksack.length
        );
        const commonItems = compartment1.filter((item) =>
          compartment2.includes(item)
        );

        return {
          compartment1,
          compartment2,
          commonItems,
        };
      });

    let prioritiesCount = 0;

    rucksacks.forEach((rucksack) => {
      prioritiesCount += PRIORITIES[rucksack.commonItems[0]];
    });

    console.log(prioritiesCount);
  } catch (err) {
    console.error(err);
  }
};

main();
