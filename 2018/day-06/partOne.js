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

// function to check if a grid point is on the edge of the grid
const isEdge = (x, y, minX, maxX, minY, maxY) => {
  return x === minX || x === maxX || y === minY || y === maxY;
};

const main = async () => {
  try {
    const coords = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((coord) => coord.split(", ").map(Number));

    const { coordsMin, coordsMax } = findMinMaxCoords(coords);

    const grid = {};

    for (let i = coordsMin.x; i <= coordsMax.x; i++) {
      for (let j = coordsMin.y; j <= coordsMax.y; j++) {
        const x = i;
        const y = j;

        const distances = [];

        coords.forEach((coord, index) => {
          const distance = manhattanDistance([x, y], coord);
          distances.push({
            distance,
            index,
          });
        });

        const minDistance = Math.min(...distances.map((d) => d.distance));

        const closest = distances.filter((d) => d.distance === minDistance);

        if (closest.length === 1) {
          grid[`${x},${y}`] = closest[0].index;
        } else {
          grid[`${x},${y}`] = null;
        }
      }
    }

    const infiniteAreas = new Set();

    for (let i = coordsMin.x; i <= coordsMax.x; i++) {
      for (let j = coordsMin.y; j <= coordsMax.y; j++) {
        const x = i;
        const y = j;

        const closestCoordIndex = grid[`${x},${y}`];

        // if this point is on the edge and it's assigned to a coordinate
        if (
          closestCoordIndex !== null &&
          isEdge(x, y, coordsMin.x, coordsMax.x, coordsMin.y, coordsMax.y)
        ) {
          infiniteAreas.add(closestCoordIndex); // Mark this coordinate as having an infinite area
        }
      }
    }

    const areaSizes = new Map();

    coords.forEach((_, index) => {
      if (!infiniteAreas.has(index)) {
        areaSizes.set(index, 0);
      }
    });

    for (let i = coordsMin.x; i <= coordsMax.x; i++) {
      for (let j = coordsMin.y; j <= coordsMax.y; j++) {
        const x = i;
        const y = j;

        const closestCoordIndex = grid[`${x},${y}`];

        // if the coordinate is not infinite, count this grid point
        if (closestCoordIndex !== null && areaSizes.has(closestCoordIndex)) {
          areaSizes.set(
            closestCoordIndex,
            areaSizes.get(closestCoordIndex) + 1
          );
        }
      }
    }

    // find the largest area size among the finite areas
    const largestArea = Math.max(...areaSizes.values());

    console.log(largestArea);
  } catch (err) {
    console.error(err);
  }
};

main();
