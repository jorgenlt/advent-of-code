import decimalToBinary from "../../utils/decimalToBinary.js";

const isWall = (x, y, favNum) => {
  const decimal = x * x + 3 * x + 2 * x * y + y + y * y + favNum;
  const binary = decimalToBinary(decimal);
  const oneBits = binary.split("1").length - 1;

  return oneBits % 2 !== 0;
};

const directions = [
  { dx: 0, dy: -1 }, // Up
  { dx: 0, dy: 1 }, // Down
  { dx: -1, dy: 0 }, // Left
  { dx: 1, dy: 0 }, // Right
];

const posKey = (pos) => `${pos.x},${pos.y}`;

const findShortestPath = (start, end, favNum) => {
  const visited = new Set();
  const queue = [];
  queue.push({ ...start, distance: 0 }); // {x: 1, y: 1}
  visited.add(posKey(start));

  while (queue.length > 0) {
    const currentLocation = queue.shift();

    if (currentLocation.x === end.x && currentLocation.y === end.y) {
      return currentLocation.distance;
    }

    for (const direction of directions) {
      const newX = direction.dx + currentLocation.x;
      const newY = direction.dy + currentLocation.y;
      const newPos = posKey({ x: newX, y: newY });

      if (visited.has(newPos)) {
        continue;
      }

      if (newX < 0 || newY < 0) {
        continue;
      }

      if (isWall(newX, newY, favNum)) {
        continue;
      }

      queue.push({ x: newX, y: newY, distance: currentLocation.distance + 1 });
      visited.add(newPos);
    }
  }

  return null;
};

const solvePuzzle = (favNum) => {
  return findShortestPath({ x: 1, y: 1 }, { x: 31, y: 39 }, favNum);
};

const main = async () => {
  try {
    const input = 1350;

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
