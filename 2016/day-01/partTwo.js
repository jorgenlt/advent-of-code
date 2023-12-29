import { readFile } from "fs/promises";
import manhattanDistance from "../../utils/manhattanDistance.js";
import getCoordRange from "../../utils/getCoordRange.js";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf8"))
      .trim()
      .split(", ")
      .map((e) => [e[0], Number(e.slice(1))]);

    const start = [0, 0];

    let currentCoord = [0, 0];
    let currentOrientation = "N";

    const visited = new Set();
    const alreadyVisited = new Set();

    input.forEach((instruction, i) => {
      const [direction, steps] = instruction;

      const oldCoord = currentCoord;

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

      const coordRange = getCoordRange(oldCoord.join(), currentCoord.join());

      if (visited.has(currentCoord.join())) {
        alreadyVisited.add(currentCoord.join());
        console.log(`already visited ${currentCoord}`);
      }

      coordRange.forEach((coord) => {
        visited.add(coord);
        console.log(visited);
      });
    });

    console.log(alreadyVisited);

    const firstRevisited = [...alreadyVisited][0].split(",");
    console.log(firstRevisited);

    console.log(manhattanDistance(start, firstRevisited));
  } catch (err) {
    console.error(err);
  }
};

main();
