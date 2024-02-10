import { readFile } from "fs/promises";
import transposeMatrix from "../../utils/transposeMatrix.js";

const calcViewingDist = (tree, trees) => {
  let viewingDistance = 0;

  for (let i = 0; i < trees.length; i++) {
    viewingDistance++;

    if (trees[i] >= tree) {
      return viewingDistance;
    }
  }

  return viewingDistance;
};

const calcScenicScore = (tree, left, right, up, down) => {
  return (
    calcViewingDist(tree, left) *
    calcViewingDist(tree, right) *
    calcViewingDist(tree, up) *
    calcViewingDist(tree, down)
  );
};

const main = async () => {
  try {
    const forest = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((e) => e.split("").map(Number));

    const transposedForest = transposeMatrix(forest);

    let highestScenicScore = 0;

    for (let i = 1; i < forest.length - 1; i++) {
      for (let j = 1; j < forest[i].length - 1; j++) {
        const tree = forest[i][j];
        const treesRow = forest[i];
        const treesCol = transposedForest[j];

        const left = treesRow.slice(0, j).reverse();
        const right = treesRow.slice(j + 1, treesRow.length);
        const up = treesCol.slice(0, i).reverse();
        const down = treesCol.slice(i + 1, treesRow.length);

        const scenicScore = calcScenicScore(tree, left, right, up, down);

        if (scenicScore > highestScenicScore) {
          highestScenicScore = scenicScore;
        }
      }
    }

    console.log(highestScenicScore);
  } catch (err) {
    console.error(err);
  }
};

main();
