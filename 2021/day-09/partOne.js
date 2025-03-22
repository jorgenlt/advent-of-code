import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input.split("\n").map((l) => l.split("").map(Number));
};

const directions = [
  [0, -1], // up
  [0, 1], // down
  [1, 0], // right
  [-1, 0], // left
];

const solvePuzzle = (input) => {
  const heightmap = parseInput(input);

  const maxX = heightmap[0].length;
  const maxY = heightmap.length;

  let sum = 0;

  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      const current = heightmap[y][x];
      const neigbours = [];

      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (newX >= 0 && newX < maxX && newY >= 0 && newY < maxY) {
          const height = heightmap[y + dy][x + dx];
          neigbours.push(height);
        }
      }

      if (neigbours.every((e) => e > current)) {
        sum += current + 1;
      }
    }
  }

  return sum;
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
