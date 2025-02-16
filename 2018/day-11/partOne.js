import { readFile } from "fs/promises";

const getHundredsDigit = (number) => {
  return Math.floor((number % 1000) / 100) || 0;
};

const calcPowerLevel = (x, y, gridSN) => {
  const rackId = x + 10;
  let powerLevel = (rackId * y + gridSN) * rackId;
  return getHundredsDigit(powerLevel) - 5;
};

const isWithinGrid = (cells, gridSize) => {
  return cells.every(([x, y]) => {
    return x >= 0 && x < gridSize && y >= 0 && y < gridSize;
  });
};

const getTotalPower = (topLeftCell, gridSize, gridSN) => {
  const [x, y] = topLeftCell;
  const cells = [
    [x, y], // top left
    [x + 1, y], // top middle
    [x + 2, y], // top right
    [x, y + 1], // middle left
    [x + 1, y + 1], // center
    [x + 2, y + 1], // middle right
    [x, y + 2], // bottom left
    [x + 1, y + 2], // bottom middle
    [x + 2, y + 2], // bottom right
  ];

  if (!isWithinGrid(cells, gridSize)) {
    return 0;
  }

  let totalPower = 0;

  for (const [x, y] of cells) {
    totalPower += calcPowerLevel(x, y, gridSN);
  }

  return totalPower;
};

const solvePuzzle = (gridSN) => {
  let gridSize = 300;
  let highesttotalPower = 0;
  let topLeftCell = "";

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const totalPower = getTotalPower([x, y], gridSize, gridSN);
      if (totalPower > highesttotalPower) {
        highesttotalPower = totalPower;
        topLeftCell = `${x},${y}`;
      }
    }
  }

  return topLeftCell;
};

const main = async () => {
  try {
    const input = 9110;

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
