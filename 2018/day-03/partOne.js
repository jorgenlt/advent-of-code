import { readFile } from "fs/promises";

const findHashCoordinatesInRegion = (startX, startY, width, height) => {
  const hashCoordinates = [];

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const x = startX + j;
      const y = startY + i;
      hashCoordinates.push(`${x},${y}`);
    }
  }

  return hashCoordinates;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim().split("\n");

    const regex = /@ (\d+),(\d+): (\d+)x(\d+)/;

    const occupiedCoords = new Map();

    input.forEach((line) => {
      const matches = line.match(regex);
      const x = Number(matches[1]);
      const y = Number(matches[2]);
      const width = Number(matches[3]);
      const height = Number(matches[4]);

      const hashCoords = findHashCoordinatesInRegion(x, y, width, height);

      hashCoords.forEach((coord) => {
        if (occupiedCoords.has(coord)) {
          occupiedCoords.set(coord, occupiedCoords.get(coord) + 1);
        } else {
          occupiedCoords.set(coord, 1);
        }
      });
    });

    let twoOrMoreClaims = 0;

    [...occupiedCoords.values()].forEach((value) => {
      if (value > 1) {
        twoOrMoreClaims++;
      }
    });

    console.log(twoOrMoreClaims);
  } catch (err) {
    console.error(err);
  }
};

main();
