import { readFile } from "fs/promises";

const getLineCoords = (startX, startY, endX, endY) => {
  const coords = [];

  if (startX === endX) {
    // Vertical line
    const minY = Math.min(startY, endY);
    const maxY = Math.max(startY, endY);
    for (let y = minY; y <= maxY; y++) {
      coords.push(`${startX},${y}`);
    }
  } else if (startY === endY) {
    // Horizontal line
    const minX = Math.min(startX, endX);
    const maxX = Math.max(startX, endX);
    for (let x = minX; x <= maxX; x++) {
      coords.push(`${x},${startY}`);
    }
  }
  return coords;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((e) => {
        const match = e.match(/(\d+),(\d+) -> (\d+),(\d+)/);
        if (match) {
          const [, x1, y1, x2, y2] = match;
          return {
            from: [Number(x1), Number(y1)],
            to: [Number(x2), Number(y2)],
          };
        }
      });

    // Map to save all coords that has a line
    const coords = new Map();

    input.forEach((line) => {
      // Find all coords a line goes through
      const [x1, y1] = line.from;
      const [x2, y2] = line.to;
      const coordRange = getLineCoords(x1, y1, x2, y2);

      // Save all coords in the Map
      coordRange.forEach((coord) => {
        if (coords.has(coord)) {
          coords.set(coord, coords.get(coord) + 1);
        } else {
          coords.set(coord, 1);
        }
      });
    });

    let result = 0;

    // Find how many coords in coords are visited more than once
    [...coords.values()].forEach((value) => {
      if (value > 1) {
        result++;
      }
    });

    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

main();
