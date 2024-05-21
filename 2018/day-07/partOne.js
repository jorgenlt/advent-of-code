import { readFile } from "fs/promises";

const main = async () => {
  try {
    const instructions = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n");

    const dependencies = new Map();
    const prereqsCount = new Map();
    const steps = new Set();

    instructions.forEach((instruction) => {
      const parts = instruction.split(" ");
      const before = parts[1];
      const after = parts[7];

      if (!dependencies.has(before)) {
        dependencies.set(before, []);
      }
      dependencies.get(before).push(after);

      if (!prereqsCount.has(after)) {
        prereqsCount.set(after, 0);
      }
      prereqsCount.set(after, prereqsCount.get(after) + 1);

      steps.add(before);
      steps.add(after);
    });

    const noPrereqSteps = [];
    steps.forEach((step) => {
      if (!prereqsCount.has(step)) {
        noPrereqSteps.push(step);
      }
    });

    noPrereqSteps.sort();

    const resultOrder = [];

    while (noPrereqSteps.length > 0) {
      const currentStep = noPrereqSteps.shift();
      resultOrder.push(currentStep);

      if (dependencies.has(currentStep)) {
        dependencies.get(currentStep).forEach((dependent) => {
          prereqsCount.set(dependent, prereqsCount.get(dependent) - 1);
          if (prereqsCount.get(dependent) === 0) {
            noPrereqSteps.push(dependent);
            noPrereqSteps.sort();
          }
        });
      }
    }

    console.log(resultOrder.join(""));
  } catch (err) {
    console.error(err);
  }
};

main();
