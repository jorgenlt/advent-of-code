import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input.split("\n").map((l) => l.split(""));
};

const findStartEnd = (map) => {
  let startPos, endPos;

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const cell = map[row][col];

      if (cell === "S") startPos = [col, row];
      if (cell === "E") endPos = [col, row];
    }
  }

  return { startPos, endPos };
};

const solvePuzzle = (input) => {
  const map = parseInput(input);
  const { startPos, endPos } = findStartEnd(map);

  const directions = ["east", "south", "west", "north"];
  const directionVectors = {
    east: [1, 0],
    south: [0, 1],
    west: [-1, 0],
    north: [0, -1],
  };

  const priorityQueue = []; // Queue be sorted by cost
  const visited = new Map();
  const bestPathsTiles = new Set();

  // Add first element in the queue
  priorityQueue.push({
    pos: startPos,
    direction: "east",
    cost: 0,
    path: [startPos.join(",")],
  });

  let minCost = Infinity;

  while (priorityQueue.length > 0) {
    priorityQueue.sort((a, b) => a.cost - b.cost); // Sort the priority queue based on cost

    const currentCell = priorityQueue.shift(); // Remove from queue, assign to variable

    const stateKey = `${currentCell.pos[0]},${currentCell.pos[1]},${currentCell.direction}`;
    const existingVisitCost = visited.get(stateKey)?.cost;

    // Skip if existingVisitCost is more as the cost of the current cell (change from Part 1: <= to <)
    if (existingVisitCost < currentCell.cost) continue;

    visited.set(stateKey, { cost: currentCell.cost, path: currentCell.path }); // Add to visited map

    // Handle end postition tile (To solve Part 2 the end position logic is different)
    if (currentCell.pos[0] === endPos[0] && currentCell.pos[1] === endPos[1]) {
      if (currentCell.cost < minCost) {
        minCost = currentCell.cost;
        bestPathsTiles.clear();
      }
      if (currentCell.cost === minCost) {
        currentCell.path.forEach((tile) => bestPathsTiles.add(tile));
      }
      continue;
    }

    // Movement vector based on the current direction
    const forwardVector = directionVectors[currentCell.direction];

    // Calculate the new position
    const newPosition = [
      currentCell.pos[0] + forwardVector[0],
      currentCell.pos[1] + forwardVector[1],
    ];

    // Check if the new position is valid
    const isWithinBounds =
      newPosition[0] >= 0 &&
      newPosition[0] < map[0].length &&
      newPosition[1] >= 0 &&
      newPosition[1] < map.length;

    // Check if new position is not blocked
    const isNotBlocked = map[newPosition[1]][newPosition[0]] !== "#";

    if (isWithinBounds && isNotBlocked) {
      const forwardMovementCost = currentCell.cost + 1;
      const newPath = [...currentCell.path, newPosition.join(",")];

      // Add the new position to the priority queue with updated cost and direction
      priorityQueue.push({
        pos: newPosition,
        direction: currentCell.direction,
        cost: forwardMovementCost,
        path: newPath,
      });
    }

    const rotations = [
      (dirIndex) => (dirIndex + 1) % 4, // Clockwise
      (dirIndex) => (dirIndex + 3) % 4, // Counterclockwise
    ];

    rotations.forEach((rotation) => {
      const newDirectionIndex = rotation(
        directions.indexOf(currentCell.direction)
      );
      const newDirection = directions[newDirectionIndex];

      const rotateCost = currentCell.cost + 1000;

      priorityQueue.push({
        pos: currentCell.pos,
        direction: newDirection,
        cost: rotateCost,
        path: [...currentCell.path],
      });
    });
  }

  return bestPathsTiles.size;
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
