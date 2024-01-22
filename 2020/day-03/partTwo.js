import { readFile } from "fs/promises";

const extendInput = (input, multiplier) => {
  const newInput = [...input];

  for (let i = 0; i < multiplier; i++) {
    for (let j = 0; j < input.length; j++) {
      newInput[j].push(...input[j]);
    }
  }

  return newInput;
};

const isTree = (input, coords) => {
  const [row, col] = coords;

  if (input[row][col] === "#") {
    return true;
  }

  return false;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((e) => e.split(""));

    const extended = extendInput(input, 7); // Use multiplier from part 1

    let treeCounts = [];

    // [row, col]
    const directions = [
      [1, 1],
      [1, 3],
      [1, 5],
      [1, 7],
      [2, 1],
    ];

    directions.forEach((direction) => {
      let treeCount = 0;

      let currentCoords = [...direction];

      while (currentCoords[0] < extended.length) {
        if (isTree(extended, currentCoords)) {
          treeCount++;
        }

        currentCoords[0] += direction[0];
        currentCoords[1] += direction[1];
      }

      treeCounts.push(treeCount);
    });

    const result = treeCounts.reduce((acc, curr) => acc * curr);

    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

main();
