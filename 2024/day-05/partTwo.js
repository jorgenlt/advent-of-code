import { readFile } from "fs/promises";

const isUpdateInCorrectOrder = (update, rules) => {
  for (let [before, after] of rules) {
    let indexBefore = update.indexOf(before);
    let indexAfter = update.indexOf(after);
    if (indexBefore !== -1 && indexAfter !== -1 && indexBefore > indexAfter) {
      return false;
    }
  }
  return true;
};

// Function to sort an update according to the rules
// https://www.freecodecamp.org/news/how-to-implement-bubble-sort-algorithm-with-javascript/
const sortUpdate = (update, rules) => {
  let sorted = [...update];
  let changed = true;

  while (changed) {
    changed = false;
    for (let i = 0; i < sorted.length - 1; i++) {
      for (let [before, after] of rules) {
        let indexBefore = sorted.indexOf(before);
        let indexAfter = sorted.indexOf(after);

        if (
          indexBefore !== -1 &&
          indexAfter !== -1 &&
          indexBefore > indexAfter
        ) {
          // Swap the pages
          [sorted[indexBefore], sorted[indexAfter]] = [
            sorted[indexAfter],
            sorted[indexBefore],
          ];
          changed = true;
        }
      }
    }
  }

  return sorted;
};

const main = async () => {
  try {
    const [rulesPart, updatesPart] = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n\n");

    const rules = rulesPart
      .split("\n")
      .map((line) => line.split("|").map(Number));

    const updates = updatesPart
      .split("\n")
      .map((line) => line.split(",").map(Number));

    const incorrectUpdates = [];

    // Find updates with invalid order
    updates.forEach((update) => {
      if (!isUpdateInCorrectOrder(update, rules)) {
        incorrectUpdates.push(update);
      }
    });

    // Sort incorrect orders according to the rules
    let sumMiddlePages = 0;

    incorrectUpdates.forEach((update) => {
      const sortedUpdate = sortUpdate(update, rules);

      const middleIndex = Math.floor(sortedUpdate.length / 2);

      sumMiddlePages += sortedUpdate[middleIndex];
    });

    console.log(sumMiddlePages);
  } catch (err) {
    console.error(err);
  }
};

main();
