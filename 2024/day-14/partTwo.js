import { readFile } from "fs/promises";
import createGrid from "../../utils/createGrid.js";

const parseInput = (input) => {
  return input.split("\n").map((line) => {
    const [p, v] = line.split(" ");
    const [px, py] = p.match(/\-?\d+/g).map(Number);
    const [vx, vy] = v.match(/\-?\d+/g).map(Number);

    return {
      px,
      py,
      vx,
      vy,
    };
  });
};

const findXmasTree = (width, height, seconds, input) => {
  // Simulate positions
  const robots = parseInput(input);

  robots.forEach((robot) => {
    robot.px = (robot.px + robot.vx * seconds) % width;
    robot.py = (robot.py + robot.vy * seconds) % height;

    // Handle negative wrapping to keep robot in valid grid coords
    if (robot.px < 0) robot.px += width;
    if (robot.py < 0) robot.py += height;
  });

  // Find Xmas tree (when all robots are in unique positions, the tree is formed)
  const totalRobots = input.split("\n").length;

  const uniquePositions = new Set();

  robots.forEach(({ px, py }) => {
    const key = `${px},${py}`;
    uniquePositions.add(key);
  });

  if (totalRobots === uniquePositions.size) {
    // Create the grid filled with dots. Change all robot's positions to "X"
    const grid = createGrid(101, 103, ".");
    robots.forEach((robot) => {
      grid[robot.py][robot.px] = "X";
    });

    // Log the tree and answer
    grid.forEach((line) => console.log(line.join("")));
    console.log("Seconds:", seconds);

    return true;
  }
  return false;
};

const solvePuzzle = (input) => {
  const width = 101;
  const height = 103;

  let treeFound = false;
  let seconds = 0;

  while (!treeFound) {
    treeFound = findXmasTree(width, height, seconds, input);
    seconds++;
  }
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    solvePuzzle(input);
  } catch (err) {
    console.error(err);
  }
};

main();
