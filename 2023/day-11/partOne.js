import { readFile } from "../utils/readFile.js";

const main = async () => {
  try {
    let input = await readFile("input.txt");

    let currentGalaxyNum = 1;
    input = input.replace(/#/g, () => {
      return currentGalaxyNum++;
    });

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

    // Converting strings into arrays with single characters
    rows = rows.map((row) =>
      row.split("").map((e) => (isNaN(Number(e)) ? e : Number(e)))
    );
    columns = columns.map((column) =>
      column.split("").map((e) => (isNaN(Number(e)) ? e : Number(e)))
    );

    // console.log("🚀 ~ main ~ rows:", rows);
    // console.log("🚀 ~ main ~ columns:", columns);

    // Changing #s to galaxy numbers
    // let currentGalaxyNum = 1;

    // rows = rows.map((row) => {
    //   // console.log(row);
    //   row = row.map((char) => {
    //     // Assign the result of map function to row
    //     if (char === "#") {
    //       const galaxyNum = currentGalaxyNum;
    //       currentGalaxyNum++;
    //       return galaxyNum;
    //     } else {
    //       return char;
    //     }
    //   });
    //   return row;
    // });

    // console.log("🚀 ~ main ~ rows:", rows);
    // console.log("🚀 ~ main ~ columns:", columns);

    // Find pairs. Only count each pair once.
    console.log(input)
    console.log("currentGalaxyNum", currentGalaxyNum - 1)
    const galaxyPairs = uniquePairs(currentGalaxyNum - 1);
    // console.log("🚀 ~ main ~ galaxyPairs:", galaxyPairs)
    // console.log("🚀 ~ main ~ galaxyPairs:", galaxyPairs.length)

    // For each pairs find the shortest path between them (the galxies)
    // galaxyPairs.forEach((pair) => {
    //   console.log("pair: ", pair);
    //   const xyFrom = location(pair[0], rows, columns);
    //   console.log("🚀 ~ galaxyPairs.forEach ~ xyFrom:", xyFrom);
    //   const xyTo = location(pair[1], rows, columns);
    //   console.log("🚀 ~ galaxyPairs.forEach ~ xyTo:", xyTo);

    //   const distanceRows = subtractSmallest(xyFrom[0], xyTo[0]);
    //   console.log("🚀 ~ galaxyPairs.forEach ~ distanceRows:", distanceRows)
    //   const distanceColumns = subtractSmallest(xyFrom[1], xyTo[1]);
    //   console.log("🚀 ~ galaxyPairs.forEach ~ distanceColumns:", distanceColumns)

    //   const distance = distanceRows + distanceColumns;

    //   console.log("distance:", distance);
    // });
    const distances = [];
    // For each pairs find the shortest path between them (the galaxies)
    galaxyPairs.forEach((pair) => {
      // console.log("pair: ", pair);
      const xyFrom = location(pair[0], rows, columns);
      // console.log("🚀 ~ galaxyPairs.forEach ~ xyFrom:", xyFrom);
      const xyTo = location(pair[1], rows, columns);
      // console.log("🚀 ~ galaxyPairs.forEach ~ xyTo:", xyTo);

      // Calculate Manhattan Distance
      const distance =
        Math.abs(xyFrom[0] - xyTo[0]) + Math.abs(xyFrom[1] - xyTo[1]);

      distances.push(distance);
      // console.log(
      //   `Distance between galaxy ${pair[0]} and galaxy ${pair[1]}: ${distance}`
      // );
    });

    const sumDistances = distances.reduce((prev, curr) => prev + curr);

    console.log(sumDistances)
    // Between galaxy 1 and galaxy 7: 15
    // Between galaxy 3 and galaxy 6: 17
    // Between galaxy 8 and galaxy 9: 5

    // console.log(rows);
  } catch (err) {
    throw err;
  }
};

// Function to find unique pairs
const uniquePairs = (galaxies) => {
  const galaxiesArray = [];

  // Adjust here to stop at galaxies - 1
  for (let i = 1; i <= galaxies; i++) {
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


// Function to find location of galaxy
const location = (galaxyNum, rows, columns) => {
  let x;
  let y;

  rows.forEach((row, i) => {
    let index = row.indexOf(galaxyNum);
    if (index !== -1) {
      x = i;
    }
  });

  columns.forEach((column, j) => {
    let index = column.indexOf(galaxyNum);
    if (index !== -1) {
      y = j;
    }
  });

  if (x === undefined || y === undefined) {
    console.error(`Galaxy ${galaxyNum} not found. Rows and columns:`);
    console.error(rows);
    console.error(columns);
    throw new Error(`Galaxy ${galaxyNum} not found`);
  }

  return [x, y];
};



// Function to subtract the smaller number from the larger
const subtractSmallest = (x, y) => {
  const min = Math.min(x, y);
  const max = Math.max(x, y);

  return max - min;
};

main();
