import { readFile } from "fs/promises";

const findAntennaCoords = (grid) => {
  const antennas = {};
  const rows = grid.trim().split("\n");

  // Row = y, col = x
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      const char = rows[y][x];

      if (char !== ".") {
        if (!antennas[char]) {
          antennas[char] = [];
        }
        antennas[char].push([x, y]);
      }
    }
  }

  return antennas;
};

const calculateAntinodes = (antennaList, maxX, maxY) => {
  const antinodes = new Set();

  // Check every pair of antennas
  for (let i = 0; i < antennaList.length; i++) {
    for (let j = i + 1; j < antennaList.length; j++) {
      const [x1, y1] = antennaList[i];
      const [x2, y2] = antennaList[j];

      // Calculate differences
      const dx = x2 - x1;
      const dy = y2 - y1;

      // Check for valid antinodes on both sides
      const ax1 = x1 - dx;
      const ay1 = y1 - dy;
      const ax2 = x2 + dx;
      const ay2 = y2 + dy;

      // Add valid antinodes within bounds
      if (ax1 >= 0 && ay1 >= 0 && ax1 <= maxX && ay1 <= maxY) {
        antinodes.add(`${ax1},${ay1}`);
      }
      if (ax2 >= 0 && ay2 >= 0 && ax2 <= maxX && ay2 <= maxY) {
        antinodes.add(`${ax2},${ay2}`);
      }
    }
  }

  return antinodes;
};

const main = async () => {
  try {
    const grid = (await readFile("input.txt", "utf-8")).trim();
    const rows = grid.split("\n");
    const maxX = rows[0].length - 1;
    const maxY = rows.length - 1;

    const antennaCoords = findAntennaCoords(grid);

    const allAntinodes = new Set();

    // Process each frequency group
    for (const antennaList of Object.values(antennaCoords)) {
      const freqAntinodes = calculateAntinodes(antennaList, maxX, maxY);
      freqAntinodes.forEach((node) => allAntinodes.add(node));
    }

    console.log(allAntinodes.size);
  } catch (err) {
    console.error(err);
  }
};

main();
