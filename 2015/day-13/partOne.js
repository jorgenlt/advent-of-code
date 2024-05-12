import { readFile } from "fs/promises";
import allPermutations from "../../utils/allPermutations.js";

const parseInput = (input) => {
  const parsed = {};

  input.split("\n").forEach((line) => {
    const guest = line.split(" ")[0];
    const adjacentGuest = line.split(" ").at(-1).slice(0, -1);
    const gainOrLose = line.match(/gain|lose/)[0];
    let happiness =
      (gainOrLose === "lose" ? -1 : 1) * Number(line.match(/\d+/)[0]);

    if (!parsed[guest]) {
      parsed[guest] = {};
    }

    parsed[guest][adjacentGuest] = happiness;
  });

  return parsed;
};

const getTotalHappiness = (guests, tableData) => {
  let sum = 0;

  for (let i = 0; i < guests.length; i++) {
    const guest = guests[i];
    const left = i === 0 ? guests.at(-1) : guests[i - 1];
    const right = i === guests.length - 1 ? guests[0] : guests[i + 1];

    sum += tableData[guest][left] + tableData[guest][right];
  }

  return sum;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    const tableData = parseInput(input);

    const permutations = allPermutations(Object.keys(tableData));

    let highestHappiness = 0;

    permutations.forEach((seating) => {
      const totalHappiness = getTotalHappiness(seating, tableData);

      if (totalHappiness > highestHappiness) {
        highestHappiness = totalHappiness;
      }
    });

    console.log("highestHappiness:", highestHappiness);
  } catch (err) {
    console.error(err);
  }
};

main();
