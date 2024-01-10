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

    const regex = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;

    // Map to save occupied coordinates
    const occupiedCoords = new Map();

    // Save all coordinates in the Map and their count
    input.forEach((line) => {
      const matches = line.match(regex);
      const x = Number(matches[2]);
      const y = Number(matches[3]);
      const width = Number(matches[4]);
      const height = Number(matches[5]);

      const hashCoords = findHashCoordinatesInRegion(x, y, width, height);

      hashCoords.forEach((coord) => {
        if (occupiedCoords.has(coord)) {
          occupiedCoords.set(coord, occupiedCoords.get(coord) + 1);
        } else {
          occupiedCoords.set(coord, 1);
        }
      });
    });

    // Check if any of the lines have hash coordinates that all only 1 count
    input.forEach((line) => {
      const matches = line.match(regex);
      const id = Number(matches[1]);
      const x = Number(matches[2]);
      const y = Number(matches[3]);
      const width = Number(matches[4]);
      const height = Number(matches[5]);

      const hashCoords = findHashCoordinatesInRegion(x, y, width, height);

      let overlaps = true;

      // Check every coord in the hash coords for overlapping
      // (more than 1 occurence)
      hashCoords.forEach((coord) => {
        if (occupiedCoords.get(coord) > 1) {
          overlaps = false;
        }
      });

      // If overlaps is still true after the check, the square is found.
      if (overlaps) {
        console.log("id:", id);
        return;
      }
    });

    return;
  } catch (err) {
    console.error(err);
  }
};

main();
