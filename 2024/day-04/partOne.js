import { readFile } from "fs/promises";
import reverseString from "../../utils/reverseString.js";

const checkForXmas = (word) =>
  word === "XMAS" || reverseString(word) === "XMAS";

const main = async () => {
  try {
    const grid = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((line) => line.split(""));

    let wordCount = 0;
    const maxRow = grid.length;
    const maxCol = grid[0].length;

    for (let i = 0; i < maxRow; i++) {
      for (let j = 0; j < maxCol; j++) {
        // Horizontally
        if (j <= maxCol - 4) {
          const horizontal =
            grid[i][j] + grid[i][j + 1] + grid[i][j + 2] + grid[i][j + 3];
          if (checkForXmas(horizontal)) wordCount++;
        }

        // Vertically
        if (i <= maxRow - 4) {
          const vertical =
            grid[i][j] + grid[i + 1][j] + grid[i + 2][j] + grid[i + 3][j];
          if (checkForXmas(vertical)) wordCount++;
        }

        // Diagonally right
        if (i <= maxRow - 4 && j <= maxCol - 4) {
          const diagonalRight =
            grid[i][j] +
            grid[i + 1][j + 1] +
            grid[i + 2][j + 2] +
            grid[i + 3][j + 3];
          if (checkForXmas(diagonalRight)) wordCount++;
        }

        // Diagonally left
        if (i <= maxRow - 4 && j >= 3) {
          const diagonalLeft =
            grid[i][j] +
            grid[i + 1][j - 1] +
            grid[i + 2][j - 2] +
            grid[i + 3][j - 3];
          if (checkForXmas(diagonalLeft)) wordCount++;
        }
      }
    }

    console.log(wordCount);
  } catch (err) {
    console.error(err);
  }
};

main();
