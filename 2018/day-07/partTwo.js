import { readFile } from "fs/promises";

const main = async () => {
  try {
    const instructions = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n");

    const workerCount = 5;
    const baseTime = 60;

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

    // workers
    const workers = Array(workerCount).fill(null); // null or { step: 'A', timeLeft: 60+1 }
    let time = 0;
    let completedSteps = [];

    const getStepDuration = (step) =>
      baseTime + (step.charCodeAt(0) - "A".charCodeAt(0) + 1);

    // run
    while (completedSteps.length < steps.size) {
      for (let i = 0; i < workers.length; i++) {
        if (workers[i] === null && noPrereqSteps.length > 0) {
          const nextStep = noPrereqSteps.shift();
          workers[i] = { step: nextStep, timeLeft: getStepDuration(nextStep) };
        }
      }

      time++;

      for (let i = 0; i < workers.length; i++) {
        if (workers[i] !== null) {
          workers[i].timeLeft--;
          if (workers[i].timeLeft === 0) {
            const finishedStep = workers[i].step;
            completedSteps.push(finishedStep);
            workers[i] = null;

            if (dependencies.has(finishedStep)) {
              dependencies.get(finishedStep).forEach((dependent) => {
                prereqsCount.set(dependent, prereqsCount.get(dependent) - 1);
                if (prereqsCount.get(dependent) === 0) {
                  noPrereqSteps.push(dependent);
                  noPrereqSteps.sort();
                }
              });
            }
          }
        }
      }
    }

    console.log(time);
  } catch (err) {
    console.error(err);
  }
};

main();
