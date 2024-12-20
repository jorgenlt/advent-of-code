import { readFile } from "fs/promises";

const parseInput = (input) => input.split("\n").map((l) => l.split(""));

const printGrid = (grid) => grid.forEach((l) => console.log(l.join("")));

const getStartEndPos = (grid) => {
  let startPos, endPos;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === "S") startPos = [col, row]; // [x, y]
      if (grid[row][col] === "E") endPos = [col, row]; // [x, y]

      if (startPos && endPos) return { startPos, endPos };
    }
  }
};

const solvePuzzle = (input) => {
  const grid = parseInput(input);
  const gridNoWalls = parseInput(input.replace(/\#/g, "."));

  const { startPos, endPos } = getStartEndPos(grid);

  const raceTimeWithoutCheat = input.match(/\./g).length + 1;
};

const main = async () => {
  try {
    const input = (await readFile("test.txt", "utf-8")).trim();

    solvePuzzle(input);
  } catch (err) {
    console.error(err);
  }
};

main();
