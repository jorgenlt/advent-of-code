const getHundredsDigit = (number) => {
  return Math.floor((number % 1000) / 100) || 0;
};

const calcPowerLevel = (x, y, gridSN) => {
  const rackId = x + 10;
  let powerLevel = (rackId * y + gridSN) * rackId;
  return getHundredsDigit(powerLevel) - 5;
};

const solvePuzzle = (gridSN) => {
  const gridSize = 300;

  const grid = Array.from({ length: gridSize + 1 }, () =>
    new Array(gridSize + 1).fill(0)
  );

  // Summed-area table
  const sat = Array.from({ length: gridSize + 1 }, () =>
    new Array(gridSize + 1).fill(0)
  );

  // Fill with power levels.
  for (let y = 1; y <= gridSize; y++) {
    for (let x = 1; x <= gridSize; x++) {
      grid[y][x] = calcPowerLevel(x, y, gridSN);
    }
  }

  // Build the summed-area table
  // sat[y][x] is the sum of all grid cells in the rectangle from (1,1) to (x,y)
  for (let y = 1; y <= gridSize; y++) {
    for (let x = 1; x <= gridSize; x++) {
      sat[y][x] =
        grid[y][x] + sat[y - 1][x] + sat[y][x - 1] - sat[y - 1][x - 1];
    }
  }

  let maxPower = -Infinity;
  let bestX = 0;
  let bestY = 0;
  let bestSize = 0;

  // Every possible square size from 1x1 to 300x300.
  for (let size = 1; size <= gridSize; size++) {
    for (let y = 1; y <= gridSize - size + 1; y++) {
      for (let x = 1; x <= gridSize - size + 1; x++) {
        const x2 = x + size - 1;
        const y2 = y + size - 1;
        const totalPower =
          sat[y2][x2] - sat[y - 1][x2] - sat[y2][x - 1] + sat[y - 1][x - 1];
        if (totalPower > maxPower) {
          maxPower = totalPower;
          bestX = x;
          bestY = y;
          bestSize = size;
        }
      }
    }
  }

  return `${bestX},${bestY},${bestSize}`;
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
