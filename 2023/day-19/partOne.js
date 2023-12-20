import fs from "fs/promises";

// Recursice function to check if a part is accepted
// based on its workflow and conditions
const isAccepted = (part, workflow, workflows) => {
  // If the workflow is "A" or "R", the part is always accepted or rejected
  if (workflow === "A") return true;
  if (workflow === "R") return false;

  // Get the conditions for the current workflow
  const conditions = workflows[workflow];

  // Loop through each condition
  for (let i = 0; i < conditions.length; i++) {
    const condition = conditions[i];

    // If the condition is "A", the part is accepted
    if (condition === "A") return true;

    // If the condition is "R", the part is rejected
    if (condition === "R") return false;

    // If the condition is a valid workflow name,
    // recursively check if the part is accepted for that workflow
    if (condition in workflows) return isAccepted(part, condition, workflows);

    // If the condition contains < or >
    if (condition[1] === "<" || condition[1] === ">") {
      // Get the category (x, m, a, s)
      const category = condition[0];

      // Get the value to compare against
      const value = parseInt(condition.match(/\d+/g));

      // Get the current action to execute if condition is true
      const action = condition.split(":").at(-1);

      // Get the next workflow to check if the condition false
      const nextWorkflow = conditions[i + 1].split(":").at(-1);

      // If checking for Less Than
      if (condition[1] === "<") {
        // If the condition is true, move on with the action
        // Otherwise, continue to the next iteration of the loop
        if (part[category] < value) {
          return isAccepted(part, action, workflows);
        } else {
          continue;
        }

        // If checking for Greater Than
      } else if (condition[1] === ">") {
        // If the condition is true, move on with the action
        // Otherwise, continue to the next iteration of the loop
        if (part[category] > value) {
          return isAccepted(part, action, workflows);
        } else {
          continue;
        }
      }
    }

    continue;
  }

  console.error("No conditions match");
  return null;
};

const main = async () => {
  const input = (await fs.readFile("input.txt", "utf8")).trim().split("\n\n");

  // Object to store workflows and their conditions
  let workflows = {};

  input[0].split("\n").forEach((e) => {
    // Get the workflow name
    const name = e.split("{")[0];

    const conditions = e
      .split("{")[1]
      .split(",")
      .map((c) => c.replace("}", ""));

    // Add the workflow and its conditions to the workflows object
    workflows[name] = conditions;
  });

  // Array to store parts and their properties
  let parts = [];

  // Populate parts array
  input[1]
    .split("\n")
    .map((e) => e.replace(/[{]|[}]/g, "").split(","))
    .forEach((part) => {
      const x = parseInt(part[0].match(/\d+/)[0]); // Extract the value for x
      const m = parseInt(part[1].match(/\d+/)[0]); // Extract the value for m
      const a = parseInt(part[2].match(/\d+/)[0]); // Extract the value for a
      const s = parseInt(part[3].match(/\d+/)[0]); // Extract the value for s

      parts.push({ x, m, a, s });
    });

  // Set the initial workflow
  const initialWorkflow = "in";

  let sumAcceptedParts = 0;

  // Loop through each part and check if it is accepted
  parts.forEach((part) => {
    const accepted = isAccepted(part, initialWorkflow, workflows);

    // If the part is accepted, add its values to the sumAcceptedParts variable
    if (accepted) {
      sumAcceptedParts += part.x + part.m + part.a + part.s;
    }
  });

  console.log("sumAcceptedParts:", sumAcceptedParts);
};

main();
