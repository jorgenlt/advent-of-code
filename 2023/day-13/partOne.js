// Import the fs/promises module for handling file operations asynchronously
import fs from "fs/promises";

// Define the main asynchronous function
const main = async () => {
  try {
    // Read the contents of the "input.txt" file as a UTF-8 encoded string
    const input = await fs.readFile("input.txt", "utf8");

    // Initialize a variable to keep track of the total sum
    let sum = 0;

    // Split the input string into grids
    const gridBlocks = input.trim().split("\n\n");

    gridBlocks.forEach((block) => {
      // Split the grid into rows and find the mirrored row
      const gridRows = block.split("\n");
      const mirroredRow = findMirroredRow(gridRows);
      // Increase the total by 100 times the mirrored row value
      sum += mirroredRow * 100;

      // Transpose the grid to represent columns and find the mirrored column
      const colGrid = gridRows[0]
        .split("")
        .map((_, i) => gridRows.map((row) => row[i]));
      const mirroredCol = findMirroredRow(colGrid);
      // Increase the total by the mirrored column value
      sum += mirroredCol;
    });

    // Output the final total to the console
    console.log(sum);
  } catch (err) {
    throw err;
  }
};

// Function to find the mirrored row or column in a given grid
const findMirroredRow = (grid) => {
  // Iterate over each row in the grid starting from the second row
  for (let rowIndex = 1; rowIndex < grid.length; rowIndex++) {
    // Split the grid into two parts: above and below the current row
    let above = grid.slice(0, rowIndex).reverse();
    let below = grid.slice(rowIndex);
    // Keep only the number of rows that match in both above and below
    above = above.slice(0, below.length);
    below = below.slice(0, above.length);
    // Check if the concatenated strings of above and below are identical
    if (above.join("") === below.join("")) {
      // If mirrored, return the row index (or column index in the case of transposed grids)
      return rowIndex;
    }
  }
  // If no mirror is found, return 0
  return 0;
};

main();
