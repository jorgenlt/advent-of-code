import getCircularIndexFromCurrent from "../../utils/getCircularIndexFromCurrent.js";

const addRecipes = (index1, index2, recipes) => {
  const newRecipes = (recipes[index1] + recipes[index2])
    .toString()
    .split("")
    .map(Number);
  return [...recipes, ...newRecipes];
};

const calcScore = (input, recipes) => {
  const scores = recipes.slice(input, input + 10);

  return scores.join("");
};

const solvePuzzle = (input) => {
  let recipes = [3, 7];

  let indexElf1 = 0;

  let indexElf2 = 1;

  while (recipes.length < input + 10) {
    recipes = addRecipes(indexElf1, indexElf2, recipes);
    indexElf1 = getCircularIndexFromCurrent(
      indexElf1,
      recipes[indexElf1] + 1,
      recipes.length
    );
    indexElf2 = getCircularIndexFromCurrent(
      indexElf2,
      recipes[indexElf2] + 1,
      recipes.length
    );
  }

  return calcScore(input, recipes);
};

const main = async () => {
  try {
    const input = 209231;

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
