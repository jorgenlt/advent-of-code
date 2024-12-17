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

  // Add first element in the queue
  priorityQueue.push({
    pos: startPos,
    direction: "east",
    cost: 0,
  });

  while (priorityQueue.length > 0) {
    priorityQueue.sort((a, b) => a.cost - b.cost); // Sort the priority queue based on cost

    const currentCell = priorityQueue.shift(); // Remove from queue, assign to variable

    const stateKey = `${currentCell.pos[0]},${currentCell.pos[1]},${currentCell.direction}`;
    const existingVisitCost = visited.get(stateKey);

    // Skip if existingVisitCost is more or same as the cost of the current cell
    if (existingVisitCost <= currentCell.cost) continue;

    visited.set(stateKey, currentCell.cost); // Add to visited map

    // Return cost if currentCell is end postition "E"
    if (currentCell.pos[0] === endPos[0] && currentCell.pos[1] === endPos[1]) {
      return currentCell.cost; // Return the puzzle answer
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

      // Add the new position to the priority queue with updated cost and direction
      priorityQueue.push({
        pos: newPosition,
        direction: currentCell.direction,
        cost: forwardMovementCost,
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
      });
    });
  }
};

const main = async () => {
  try {
    const input = (await readFile("test.txt", "utf-8")).trim();
    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
