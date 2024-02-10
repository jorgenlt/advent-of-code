import { readFile } from "fs/promises";
import transposeMatrix from "../../utils/transposeMatrix.js";

const isLarger = (number, array) => array.every((elem) => number > elem);

const main = async () => {
  try {
    const forest = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((e) => e.split("").map(Number));

    const transposedForest = transposeMatrix(forest);

    // For each tree. Find every tree left, right, up, down
    // Skip checking the edges. They are already visible (i=1, j=1)

    let visibleCount = 0;

    for (let i = 1; i < forest.length - 1; i++) {
      for (let j = 1; j < forest[i].length - 1; j++) {
        const tree = forest[i][j];
        const treesRow = forest[i];
        const treesCol = transposedForest[j];

        // Check all directions if tree is the highest
        const left = isLarger(tree, treesRow.slice(0, j));
        const right = isLarger(tree, treesRow.slice(j + 1, treesRow.length));
        const up = isLarger(tree, treesCol.slice(0, i));
        const down = isLarger(tree, treesCol.slice(i + 1, treesRow.length));

        if (left || right || up || down) {
          visibleCount++;
        }
      }
    }

    // Add the trees on the edge to visibleCount
    visibleCount += 2 * forest.length + 2 * transposedForest.length - 4;

    console.log("Visible:", visibleCount);
  } catch (err) {
    console.error(err);
  }
};

main();
