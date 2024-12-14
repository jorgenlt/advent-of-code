import { readFile } from "fs/promises";

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

const simulatePositions = (width, height, seconds, input) => {
  const robots = parseInput(input);

  robots.forEach((robot) => {
    robot.px = (robot.px + robot.vx * seconds) % width;
    robot.py = (robot.py + robot.vy * seconds) % height;

    // Handle negative wrapping to keep robot in valid grid coords
    if (robot.px < 0) robot.px += width;
    if (robot.py < 0) robot.py += height;
  });

  // Count robots in each quadrant
  const midX = Math.floor(width / 2);
  const midY = Math.floor(height / 2);
  const quadrants = [0, 0, 0, 0]; // [top-left, top-right, bottom-left, bottom-right]

  robots.forEach(({ px, py }) => {
    if (px === midX || py === midY) return; // Ignore robots on the center lines
    if (px < midX && py < midY) quadrants[0]++; // Top-left
    else if (px >= midX && py < midY) quadrants[1]++; // Top-right
    else if (px < midX && py >= midY) quadrants[2]++; // Bottom-left
    else if (px >= midX && py >= midY) quadrants[3]++; // Bottom-right
  });

  // Calculate safety factor
  const safetyFactor = quadrants.reduce((acc, count) => acc * count, 1);
  return safetyFactor;
};

const solvePuzzle = (input) => {
  const width = 101;
  const height = 103;
  const seconds = 100;

  console.log(simulatePositions(width, height, seconds, input));
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
