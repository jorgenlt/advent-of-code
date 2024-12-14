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

const simulatePositions = (width, height, seconds, input) => {
  const robots = parseInput(input);
  const totalRobots = input.split("\n").length;
  console.log("totalRobots:", totalRobots);

  robots.forEach((robot) => {
    robot.px = (robot.px + robot.vx * seconds) % width;
    robot.py = (robot.py + robot.vy * seconds) % height;

    // Handle negative wrapping to keep robot in valid grid coords
    if (robot.px < 0) robot.px += width;
    if (robot.py < 0) robot.py += height;
  });
  
  const uniquePositions = new Set();

  robots.forEach(({ px, py }) => {
    const key = `${px},${py}`;
    uniquePositions.add(key);
  });

  const robotsOnUniquePos = uniquePositions.size;
  console.log("robotsOnUniquePos:", robotsOnUniquePos)
 
  const grid = createGrid(101, 103, ".");

  robots.forEach((robot) => {
    grid[robot.py][robot.px] = "X";
  });

  grid.forEach(line => console.log(line.join("")));
  if (totalRobots === robotsOnUniquePos) {

    console.log("Seconds:", seconds)

    return true;
  }

  console.log("Seconds:", seconds)
  return false;
};

const solvePuzzle = (input) => {
  const width = 101;
  const height = 103;
  // const seconds = 100;

  // console.log(simulatePositions(width, height, seconds, input));
  for (let seconds = 0; seconds <= 10000; seconds++) {
    if(simulatePositions(width, height, seconds, input)) break;
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
