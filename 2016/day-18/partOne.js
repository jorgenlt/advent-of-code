import { readFile } from "fs/promises";

const isTrap = (i, prevRow) => {
  const left = i === 0 ? "." : prevRow[i - 1];
  const center = prevRow[i];
  const right = i === prevRow.length - 1 ? "." : prevRow[i + 1];

  if (left === "^" && center === "^" && right === ".") return true;
  if (left === "." && center === "^" && right === "^") return true;
  if (left === "^" && center === "." && right === ".") return true;
  if (left === "." && center === "." && right === "^") return true;

  return false;
};

const countSafeTiles = (tiles) => {
  let safeTilesCount = 0;

  tiles.forEach((row) => {
    row.forEach((tile) => {
      if (tile === ".") {
        safeTilesCount++;
      }
    });
  });

  return safeTilesCount;
};

const solvePuzzle = (input) => {
  const totalRows = 40;
  const rowLength = input.length;
  const tiles = Array.from({ length: totalRows - 1 }, () =>
    Array.from({ length: rowLength }, () => ".")
  );
  tiles.unshift(input.split(""));

  for (let i = 1; i < tiles.length; i++) {
    const prevRow = tiles[i - 1];
    const row = tiles[i];

    for (let j = 0; j < row.length; j++) {
      if (isTrap(j, prevRow)) {
        tiles[i][j] = "^";
      }
    }
  }

  return countSafeTiles(tiles);
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
