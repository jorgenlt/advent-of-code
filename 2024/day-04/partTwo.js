import { readFile } from "fs/promises";
import reverseString from "../../utils/reverseString.js";

const checkForMas = (word) => word === "MAS" || reverseString(word) === "MAS";

const main = async () => {
  try {
    const grid = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((line) => line.split(""));

    let xMasCount = 0;
    const maxRow = grid.length;
    const maxCol = grid[0].length;

    for (let i = 0; i < maxRow - 2; i++) {
      for (let j = 0; j < maxCol - 2; j++) {
        const diagonalRight =
          grid[i][j] + grid[i + 1][j + 1] + grid[i + 2][j + 2];

        const diagonalLeft =
          grid[i][j + 2] + grid[i + 1][j + 1] + grid[i + 2][j];

        if (checkForMas(diagonalRight) && checkForMas(diagonalLeft))
          xMasCount++;
      }
    }

    console.log(xMasCount);
  } catch (err) {
    console.error(err);
  }
};

main();
