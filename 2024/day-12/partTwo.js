import { readFile } from "fs/promises";

const getAdjacentCoords = (x, y) => [
  [x + 1, y],
  [x - 1, y],
  [x, y + 1],
  [x, y - 1],
];

// BDS to explore a region of the same plant type
const exploreRegion = (grid, startX, startY, visited) => {
  const queue = [[startX, startY]];
  const plantType = grid[startX][startY];
  const region = new Set();

  const visitCoordinate = (x, y) => `${x},${y}`;
  visited.add(visitCoordinate(startX, startY));

  while (queue.length > 0) {
    const [currentX, currentY] = queue.shift();
    region.add(visitCoordinate(currentX, currentY));

    for (const [neighbourX, neighbourY] of getAdjacentCoords(
      currentX,
      currentY
    )) {
      // Check if neighbour is within grid and of the same plant type
      if (
        grid[neighbourX]?.[neighbourY] === plantType &&
        !visited.has(visitCoordinate(neighbourX, neighbourY))
      ) {
        visited.add(visitCoordinate(neighbourX, neighbourY));
        queue.push([neighbourX, neighbourY]);
      }
    }
  }

  return region;
};

const calculateScore = (region) => {
  const area = region.size;
  let perimeter = 4 * area;

  // Directions to check surrounding cells
  const directions = [
    [1, 0],
    [0, 1],
  ];

  for (const plant of region) {
    const [plantX, plantY] = plant.split(",").map(Number);

    for (const [dx, dy] of directions) {
      const checkNeighbours = [
        `${plantX + dx},${plantY + dy}`,
        `${plantX + dy},${plantY + dx}`,
        `${plantX - dy},${plantY - dx}`,
        `${plantX + dx + dy},${plantY + dy + dx}`,
        `${plantX + dx - dy},${plantY + dy - dx}`,
      ];

      // Neighbouring region cells
      if (region.has(checkNeighbours[0])) {
        perimeter -= 2;

        // Diagonal and edge cases
        if (!region.has(checkNeighbours[1]) && !region.has(checkNeighbours[3]))
          perimeter--;
        if (!region.has(checkNeighbours[2]) && !region.has(checkNeighbours[4]))
          perimeter--;
      }
    }
  }

  return area * perimeter;
};

const main = async () => {
  try {
    const grid = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((line) => line.split(""));

    const visited = new Set();
    const regionScores = [];

    // Explore and score each unvisited region
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[0].length; y++) {
        if (!visited.has(`${x},${y}`)) {
          const region = exploreRegion(grid, x, y, visited);
          const score = calculateScore(region);
          regionScores.push(score);
        }
      }
    }

    const totalPrice = regionScores.reduce((acc, curr) => acc + curr, 0);

    console.log(totalPrice);
  } catch (error) {
    console.error("Error processing grid:", error);
  }
};

main();
