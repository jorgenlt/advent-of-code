import { readFile } from "fs/promises";
import manhattanDistance from "../../utils/manhattanDistance.js";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf8"))
      .trim()
      .split(", ")
      .map((e) => [e[0], Number(e.slice(1))]);

    const start = [0, 0];

    let currentCoord = [0, 0];
    let currentOrientation = "N";

    input.forEach((instruction) => {
      const [direction, steps] = instruction;

      switch (currentOrientation) {
        case "N":
          if (direction === "L") {
            currentCoord = [currentCoord[0] - steps, currentCoord[1]];
            currentOrientation = "W";
          } else {
            currentCoord = [currentCoord[0] + steps, currentCoord[1]];
            currentOrientation = "E";
          }
          break;
        case "S":
          if (direction === "L") {
            currentCoord = [currentCoord[0] + steps, currentCoord[1]];
            currentOrientation = "E";
          } else {
            currentCoord = [currentCoord[0] - steps, currentCoord[1]];
            currentOrientation = "W";
          }
          break;
        case "E":
          if (direction === "L") {
            currentCoord = [currentCoord[0], currentCoord[1] + steps];
            currentOrientation = "N";
          } else {
            currentCoord = [currentCoord[0], currentCoord[1] - steps];
            currentOrientation = "S";
          }
          break;
        case "W":
          if (direction === "L") {
            currentCoord = [currentCoord[0], currentCoord[1] - steps];
            currentOrientation = "S";
          } else {
            currentCoord = [currentCoord[0], currentCoord[1] + steps];
            currentOrientation = "N";
          }
          break;
        default:
          console.error(`Invalid orientation: ${currentOrientation}`);
      }
    });

    console.log(manhattanDistance(start, currentCoord));
  } catch (err) {
    console.error(err);
  }
};

main();
