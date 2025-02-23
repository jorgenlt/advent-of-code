import { readFile } from "fs/promises";

const parseInput = (input) => {
  const activeCubes = new Set();
  const lines = input.trim().split("\n");

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === "#") {
        activeCubes.add(`${x},${y},0`);
      }
    }
  }

  return activeCubes;
};

const getNeighbors = (x, y, z) => {
  const neighbors = [];
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dz = -1; dz <= 1; dz++) {
        if (dx !== 0 || dy !== 0 || dz !== 0) {
          neighbors.push(`${x + dx},${y + dy},${z + dz}`);
        }
      }
    }
  }
  return neighbors;
};

const simulateCycle = (activeCubes) => {
  const neighborCounts = new Map();
  const newActiveCubes = new Set();

  for (const cube of activeCubes) {
    const [x, y, z] = cube.split(",").map(Number);
    const neighbors = getNeighbors(x, y, z);

    let activeNeighbors = 0;
    for (const neighbor of neighbors) {
      if (activeCubes.has(neighbor)) {
        activeNeighbors++;
      }
      neighborCounts.set(neighbor, (neighborCounts.get(neighbor) || 0) + 1);
    }

    if (activeNeighbors === 2 || activeNeighbors === 3) {
      newActiveCubes.add(cube);
    }
  }

  for (const [cube, count] of neighborCounts.entries()) {
    if (count === 3) {
      newActiveCubes.add(cube);
    }
  }

  return newActiveCubes;
};

const solvePuzzle = (input) => {
  let activeCubes = parseInput(input);
  const cycles = 6;

  for (let i = 0; i < cycles; i++) {
    activeCubes = simulateCycle(activeCubes);
  }

  return activeCubes.size;
};

const main = async () => {
  try {
    const input = await readFile("input.txt", "utf-8");

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
