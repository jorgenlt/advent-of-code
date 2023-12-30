import { readFile } from "fs/promises";
import allCombinationsArray from "../../utils/allCombinationsArray.js";

const isDivisible = (a, b) => {
  if (a % b === 0) {
    return true;
  }
  return false;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .replaceAll("\t", " ")
      .split("\n")
      .map((e) => e.split(" ").map(Number));

    let sum = 0;

    // Find max and min, add diff to sum
    input.forEach((line) => {
      // Create an array of all possible combinations
      const allCombos = allCombinationsArray(line);

      allCombos.forEach((combo) => {
        const [a, b] = combo;

        if (isDivisible(a, b)) {
          sum += a / b;
        }
      });
    });

    console.log(sum);
  } catch (err) {
    console.error(err);
  }
};

main();
