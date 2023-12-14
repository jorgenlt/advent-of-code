import fs from "fs/promises";
import { transposeMatrix } from "../utils/transposeMatrix.js";

const findNextIndex = (row) => {
  const reverse = [...row].reverse();

  const firstObstacleFromEnd = reverse.join("").search(/[O#]/);

  if (firstObstacleFromEnd === -1) {
    return 0;
  } else {
    let obstacleIndex = row.length - 1 - firstObstacleFromEnd;
    if (obstacleIndex === row.length - 1) {
      return null;
    } else if (row[obstacleIndex + 1] === ".") {
      return obstacleIndex + 1;
    }
  }
};

const main = async () => {
  try {
    const input = await fs.readFile("input.txt", "utf8");

    const rows = input
      .trim()
      .split("\n")
      .map((row) => row.split(""));

    // Transpose to work with rows instead of columns, and left/right instead of north/south.
    const transposed = transposeMatrix(rows);

    // To store new array
    const resultArray = [];

    transposed.forEach((row) => {
      const newRow = [];

      row.forEach((e, i) => {
        if (e === "." || e === "#") {
          newRow.push(e);
        } else if (e === "O" && i === 0) {
          newRow.push(e);
        } else if (e === "O" && i > 0) {
          newRow.push(".");
          newRow[findNextIndex(newRow)] = "O";
        }
      });

      resultArray.push(newRow);
    });

    let totalLoad = 0;

    resultArray.forEach((row) => {
      row.forEach((e, i) => {
        if (e === "O") totalLoad += row.length - i;
      });
    });

    console.log(totalLoad);
    return totalLoad;
  } catch (err) {
    throw err;
  }
};

main();
