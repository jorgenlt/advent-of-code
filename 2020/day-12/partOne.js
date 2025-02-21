import { readFile } from "fs/promises";
import calculateManhattanDistance from "../../utils/calculateManhattanDistance.js";

const parseInput = (input) => {
  return input.split("\n").map((l) => {
    const action = l[0];
    const value = Number(l.slice(1));
    return [action, value];
  });
};

const directionDegrees = {
  0: "N",
  90: "E",
  180: "S",
  270: "W",
};

const directions = {
  N: [0, -1],
  E: [1, 0],
  S: [0, 1],
  W: [-1, 0],
};

const solvePuzzle = (input) => {
  const instructions = parseInput(input);

  let currentDegrees = 90;
  const startPos = [0, 0]; // x, y

  let currentPos = [...startPos];

  for (const [action, value] of instructions) {
    switch (action) {
      case "N":
      case "E":
      case "S":
      case "W": {
        const [dx, dy] = directions[action];
        currentPos[0] += dx * value;
        currentPos[1] += dy * value;
        break;
      }
      case "L":
      case "R": {
        const dirValue = action === "R" ? value : -value;
        currentDegrees = (currentDegrees + dirValue + 360) % 360;
        break;
      }
      case "F": {
        const [dx, dy] = directions[directionDegrees[currentDegrees]];
        currentPos[0] += dx * value;
        currentPos[1] += dy * value;
        break;
      }
    }
  }

  return calculateManhattanDistance(startPos, currentPos);
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
