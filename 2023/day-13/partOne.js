import fs from "fs/promises";

const main = async () => {
  try {
    const input = await fs.readFile("test.txt", "utf8");

    const grids = input
      .trim()
      .split("\n\n")
      .map((block) => block.split("\n").map((line) => line.split("")));

    grids.forEach((grid) => {
      const identicalRowsCols = getAllIdenticalPairs(grid);
      identicalRowsCols.forEach((e) => {
        const { type, index, pair } = e;
        if (type === "col") {
          console.log(type, index, pair)
        }
        if (type === "row") {
          console.log(type)
        }
      });
    });
  } catch (err) {
    throw err;
  }
};

// Function to find identical rows or cols
const getAllIdenticalPairs = (grid) => {
  const pairs = [];

  // Check columns
  for (let col = 0; col < grid[0].length - 1; col++) {
    let match = true;

    for (let row = 0; row < grid.length; row++) {
      if (grid[row][col] !== grid[row][col + 1]) {
        match = false;
        break;
      }
    }

    if (match) {
      pairs.push({
        type: "col",
        index: col,
        pair: [col, col + 1],
      });
    }
  }

  // Check rows
  for (let row = 0; row < grid.length - 1; row++) {
    let match = true;

    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] !== grid[row + 1][col]) {
        match = false;
        break;
      }
    }

    if (match) {
      pairs.push({
        type: "row",
        index: row,
        pair: [row, row + 1],
      });
    }
  }

  return pairs;
};

// Function to check if rows/cols are identical by index
const checkRowsOrColsEqual = (grid, index1, index2, type) => {
  // Validate inputs
  if (index1 < 0 || index2 < 0) return false;
  if (type !== "row" && type !== "column") return false;

  let equal = true;

  if (type === "column") {
    // Compare columns
    if (index1 >= grid[0].length || index2 >= grid[0].length) return false;

    for (let row = 0; row < grid.length; row++) {
      if (grid[row][index1] !== grid[row][index2]) {
        equal = false;
        break;
      }
    }
  } else {
    // Compare rows
    if (index1 >= grid.length || index2 >= grid.length) return false;

    for (let col = 0; col < grid[0].length; col++) {
      if (grid[index1][col] !== grid[index2][col]) {
        equal = false;
        break;
      }
    }
  }

  return equal;
};
main();
