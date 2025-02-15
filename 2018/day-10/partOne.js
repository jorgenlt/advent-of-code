// Part 1 + 2

import { readFile } from "fs/promises";
import createGrid from "../../utils/createGrid.js";

const parseInput = (input) => {
  return input.split("\n").map((l) => {
    const [x, y, vx, vy] = l.match(/-?\d+/g).map(Number);
    return {
      x,
      y,
      vx,
      vy,
    };
  });
};

const printGrid = (grid) => {
  grid.forEach((l) => console.log(l.join("")));
};

const solvePuzzle = (input) => {
  const lights = parseInput(input);

  let globalVisibleCount = 0;
  let indexAtMostVisible = 0;

  for (let i = 10300; i < 10350; i++) {
    const grid = createGrid(250, 250, ".");

    let visible = false;
    let visibleCount = 0;

    for (const light of lights) {
      let { x, y, vx, vy } = light;
      x = x + i * vx;
      y = y + i * vy;

      if (x > 0 && x < 250 && y > 0 && y < 250) {
        grid[y][x] = "#";
        visible = true;
        visibleCount++;
      }
    }

    if (visible) {
      if (visibleCount > globalVisibleCount) {
        globalVisibleCount = visibleCount;
        indexAtMostVisible = i;
      }
    }

    if (i === 10345) {
      console.log("Seconds to wait:", i);
      printGrid(grid);
      return;
    }
  }
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
