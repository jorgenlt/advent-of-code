import { readFile } from "fs/promises";
import calculateManhattanDistance from "../../utils/calculateManhattanDistance.js";

const parseInput = (input) => {
  return input.split("\n").map((l) => {
    const action = l[0];
    const value = Number(l.slice(1));
    return [action, value];
  });
};

const directions = {
  N: [0, -1],
  E: [1, 0],
  S: [0, 1],
  W: [-1, 0],
};

const solvePuzzle = (input) => {
  const instructions = parseInput(input);

  const startPos = [0, 0];
  let currentPos = [...startPos];
  let waypoint = [startPos[0] + 10, startPos[1] - 1];

  for (const [action, value] of instructions) {
    switch (action) {
      case "N":
      case "E":
      case "S":
      case "W": {
        const [dx, dy] = directions[action];
        waypoint[0] += dx * value;
        waypoint[1] += dy * value;
        break;
      }
      case "L":
        for (let i = 0; i < value; i += 90) {
          waypoint = [waypoint[1], -waypoint[0]];
        }
        break;
      case "R": {
        for (let i = 0; i < value; i += 90) {
          waypoint = [-waypoint[1], waypoint[0]];
        }
        break;
      }
      case "F": {
        currentPos[0] += waypoint[0] * value;
        currentPos[1] += waypoint[1] * value;
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
