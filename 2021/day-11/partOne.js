import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input
    .trim()
    .split("\n")
    .map((l) => l.split("").map(Number));
};

/*
You can model the energy levels and flashes of light in steps. 
During a single step, the following occurs:

First, the energy level of each octopus increases by 1.

Then, any octopus with an energy level greater than 9 flashes. 
This increases the energy level of all adjacent octopuses by 1, 
including octopuses that are diagonally adjacent. If this causes 
an octopus to have an energy level greater than 9, it also flashes. 
This process continues as long as new octopuses keep having their energy 
level increased beyond 9. (An octopus can only flash at most once per step.)

Finally, any octopus that flashed during this step has its energy 
level set to 0, as it used all of its energy to flash.

*/
const step = (octopuses) => {
  let didChange = false;

  
};

const solvePuzzle = (input) => {
  const octopuses = parseInput(input);

  const oneStep = step(octopuses);

  const afterStepOne = "6594254334385696582263756672847252447257746849658952786357563287952832799399224559579596656394862637";

  console.log(oneStep.map((l) => l.join("")).join("") === afterStepOne);
};

const main = async () => {
  try {
    const input = await readFile("test.txt", "utf-8");

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
