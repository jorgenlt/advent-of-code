import { readFile } from "fs/promises";
import createLetterNumberMapping from "../../utils/createLetterNumberMapping.js";
import findCommonItems from "../../utils/findCommonItems.js";

const PRIORITIES = createLetterNumberMapping();

const main = async () => {
  try {
    const rucksacks = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((rucksack) => rucksack.split(""));
    const groups = [];

    for (let i = 0; i < rucksacks.length; i += 3) {
      const group = [rucksacks[i], rucksacks[i + 1], rucksacks[i + 2]];
      groups.push(group);
    }

    let prioritiesCount = 0;

    groups.forEach((group) => {
      const common = findCommonItems(...group)[0];
      prioritiesCount += PRIORITIES[common];
    });

    console.log(prioritiesCount);
  } catch (err) {
    console.error(err);
  }
};

main();
