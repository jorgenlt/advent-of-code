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

const tiltNorth = (rows) => {
  // Transpose to work with rows instead of columns, left is north.
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

  return transposeMatrix(resultArray);
};

const tiltWest = (rows) => {
  // To store new array
  const resultArray = [];

  rows.forEach((row) => {
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

  return resultArray;
};

const tiltSouth = (rows) => {
  // Transpose and reverse to work with rows instead of columns, and left is now south.
  const transposed = transposeMatrix(rows);

  // Reverse
  transposed.map((row) => row.reverse());

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

  // Reverse back
  resultArray.map((row) => row.reverse());

  return transposeMatrix(resultArray);
};

const tiltEast = (rows) => {
  const reversedRows = rows.map((row) => row.reverse());

  // To store new array
  const resultArray = [];

  reversedRows.forEach((row) => {
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

  // Reverse back
  resultArray.map((row) => row.reverse());

  return resultArray;
};

const main = async () => {
  try {
    console.time();
    const input = await fs.readFile("input.txt", "utf8");

    const rows = input
      .trim()
      .split("\n")
      .map((row) => row.split(""));

    let resultArray = [...rows];
    let totalLoad = 0;

    for (let i = 0; i < 1000000000; i++) {
      const north = tiltNorth(resultArray);
      const west = tiltWest(north);
      const south = tiltSouth(west);
      const east = tiltEast(south);
      resultArray = east;
    }

    transposeMatrix(resultArray).forEach((row) => {
      row.forEach((e, i) => {
        if (e === "O") totalLoad += row.length - i;
      });
    });

    console.log(totalLoad);
    console.timeEnd();
    return totalLoad;
  } catch (err) {
    throw err;
  }
};

main();
