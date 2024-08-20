import { readFile } from "fs/promises";
import manhattanDistance from "../../utils/manhattanDistance.js";

const findMinMaxCoords = (coords) => {
  let minX = Number.MAX_VALUE;
  let maxX = Number.MIN_VALUE;
  let minY = Number.MAX_VALUE;
  let maxY = Number.MIN_VALUE;

  coords.forEach((coord) => {
    const [x, y] = coord;

    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  });

  return {
    coordsMin: {
      x: minX,
      y: minY,
    },
    coordsMax: {
      x: maxX,
      y: maxY,
    },
  };
};

const main = async () => {
  try {
    const coords = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((coord) => coord.split(", ").map(Number));

    const { coordsMin, coordsMax } = findMinMaxCoords(coords);

    coordsMin.x -= 1;
    coordsMax.x += 1;
    coordsMin.y -= 1;
    coordsMax.y += 1;

    const threshold = 10000;

    let regionSize = 0;

    // iterate over a larger grid area
    for (let x = coordsMin.x; x <= coordsMax.x; x++) {
      for (let y = coordsMin.y; y <= coordsMax.y; y++) {
        let totalDistance = 0;

        // sum Manhattan distances from to all coordinates
        coords.forEach((coord) => {
          totalDistance += manhattanDistance([x, y], coord);
        });

        // check if the total distance is less than the threshold
        if (totalDistance < threshold) {
          regionSize++;
        }
      }
    }

    console.log(regionSize);
  } catch (err) {
    console.error(err);
  }
};

main();
