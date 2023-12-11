import { readFile } from "../utils/readFile.js";

const main = async () => {
  try {
    const input = await readFile("input.txt");

    let rows = input.split("\n");
    const numRows = rows.length;
    const numColumns = input.split("\n")[0].length;

    // Populating columns
    let columns = Array.from({ length: numRows }, () => []);
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numColumns; j++) {
        columns[j].push(rows[i][j]);
      }
    }
    columns = columns.map((column) => column.join(""));
    // console.log("🚀 ~ main ~ rows:", rows.length);
    // console.log("🚀 ~ main ~ columns:", columns.length);

    // Expanding the universe
    const emptyRowsIndex = [];
    const emptyColumnsIndex = [];

    // Empty rows
    rows.forEach((row, i) => {
      if (row.split("").filter((e) => e.match(/[.]/)).length === numColumns) {
        emptyRowsIndex.push(i);
      }
    });

    // Empty columns
    columns.forEach((column, i) => {
      if (column.split("").filter((e) => e.match(/[.]/)).length === numRows) {
        emptyColumnsIndex.push(i);
      }
    });

    // Expanding empty rows
    const newRows = [...rows];
    emptyRowsIndex.forEach((i) => {
      newRows.splice(i + 1, 0, rows[i]);
    });
    rows = [...newRows].flat();

    // Expanding empty columns
    const newColumns = [...columns];
    emptyColumnsIndex.forEach((i) => {
      newColumns.splice(i, 1, [columns[i], columns[i]]);
    });
    columns = [...newColumns].flat();

    // console.log("🚀 ~ main ~ rows:", rows.length);
    // console.log("🚀 ~ main ~ columns:", columns.length);

    // change # to numbers

    // Find pairs. Only count each pair once.


    // For each pairs find the shortest path between them (the galxies)

    // console.log(input);
  } catch (err) {
    throw err;
  }
};

// Function to find unique pairs
const uniquePairs = (galaxies) => {
  const galaxiesArray = [];

  for (let i = 1; i <= 9; i++) {
    galaxiesArray.push(i);
  }

  const pairs = [];

  for (let i = 0; i < galaxiesArray.length; i++) {
    for (let j = i + 1; j < galaxiesArray.length; j++) {
      pairs.push([galaxiesArray[i], galaxiesArray[j]]);
    }
  }

  return pairs;
};

main();
