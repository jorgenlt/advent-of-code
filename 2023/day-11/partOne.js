import { readLines } from "../utils/readLines.js";

const main = async () => {
  try {
    const lines = await readLines("input.txt");

    // Get the number of rows and cols
    const rowCount = lines.length;
    const colCount = lines[0].length;

    // Array to store coordinates
    const galaxies = [];

    // Using Set to store indices of empty rows and columns
    const emptyRows = new Set();
    const emptyCols = new Set();

    // Adding all row indices to the emptyRows set
    for (let i = 0; i < rowCount; i++) {
      emptyRows.add(i);
    }

    // Adding all column indices to the emptyCols set
    for (let i = 0; i < colCount; i++) {
      emptyCols.add(i);
    }

    // Loop through each character in each line
    lines.forEach((line, row) =>
      line.split("").forEach((char, col) => {
        // If char is a galaxy, add current coordinates to the galaxies array
        if (char === "#") {
          galaxies.push([row, col]);
          // Then remove the current row and column from the empty sets
          emptyRows.delete(row);
          emptyCols.delete(col);
        }
      })
    );

    // Adjust the coordinates of each galaxy based on the number of empty rows and columns before it
    const adjustedGalaxies = galaxies.map((g) => {
      const newRow = g[0] + 1 * [...emptyRows].filter((r) => r < g[0]).length;
      const newCol = g[1] + 1 * [...emptyCols].filter((c) => c < g[1]).length;
      return [newRow, newCol];
    });

    let sum = 0;

    // Calculate the Manhattan distance between every pair of galaxies
    for (let i = 0; i < adjustedGalaxies.length - 1; i++) {
      for (let j = i + 1; j < adjustedGalaxies.length; j++) {
        sum +=
          Math.abs(adjustedGalaxies[j][0] - adjustedGalaxies[i][0]) +
          Math.abs(adjustedGalaxies[j][1] - adjustedGalaxies[i][1]);
      }
    }

    console.log(sum);

    return sum;
  } catch (err) {
    throw err;
  }
};

main();
