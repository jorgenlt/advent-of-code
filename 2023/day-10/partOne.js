import { readLines } from "../utils/readLines.js";

const main = async () => {
  try {
    const lines = await readLines("input.txt");

    // Find the index of the starting line in the maze
    const startLineIndex = lines.findIndex((line) => line.includes("S"));

    // Set the starting coordinates
    let x = startLineIndex;
    let y = lines[startLineIndex].indexOf("S");

    // Initialize direction and steps
    let direction = 0;
    let steps = 0;

    // Define actions for each type of tile
    const tileActions = {
      "|": () => (direction === 0 ? x-- : x++),
      S: () => (direction === 0 ? x-- : x++),
      "-": () => (direction === 2 ? y++ : y--),
      L: () => {
        if (direction === 1) {
          y++;
          direction = 2;
        } else {
          x--;
          direction = 0;
        }
      },
      J: () => {
        if (direction === 1) {
          y--;
          direction = 3;
        } else {
          x--;
          direction = 0;
        }
      },
      7: () => {
        if (direction === 0) {
          y--;
          direction = 3;
        } else {
          x++;
          direction = 1;
        }
      },
      F: () => {
        if (direction === 0) {
          y++;
          direction = 2;
        } else {
          x++;
          direction = 1;
        }
      },
    };

    // Start traversing the maze
    while (true) {
      steps++;

      // Get the action for the current tile, execute the action if it exists
      const action = tileActions[lines[x][y]];
      if (action) {
        action();
      }

      // If reached the start or an empty space, break the loop
      if (lines[x][y] === "S" || lines[x][y] === ".") {
        break;
      }
    }

    // Number of steps taken, rounded up to the nearest integer
    console.log(Math.ceil(steps / 2));
    return Math.ceil(steps / 2);
  } catch (err) {
    throw err;
  }
};

main();
