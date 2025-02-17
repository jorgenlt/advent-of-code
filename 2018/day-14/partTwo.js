const solvePuzzlePartTwo = (patternInput) => {
  const patternDigits = patternInput.toString().split("").map(Number);
  const patternLength = patternDigits.length;

  let recipes = [3, 7];
  let indexElf1 = 0;
  let indexElf2 = 1;

  while (true) {
    const sum = recipes[indexElf1] + recipes[indexElf2];
    const newRecipes = sum.toString().split("").map(Number);

    for (const digit of newRecipes) {
      recipes.push(digit);

      if (recipes.length >= patternLength) {
        let found = true;

        for (let i = 0; i < patternLength; i++) {
          if (
            recipes[recipes.length - patternLength + i] !== patternDigits[i]
          ) {
            found = false;
            break;
          }
        }
        if (found) {
          return recipes.length - patternLength;
        }
      }
    }

    indexElf1 = (indexElf1 + recipes[indexElf1] + 1) % recipes.length;
    indexElf2 = (indexElf2 + recipes[indexElf2] + 1) % recipes.length;
  }
};

const main = () => {
  try {
    const input = 209231;
    console.log(solvePuzzlePartTwo(input));
  } catch (err) {
    console.error(err);
  }
};

main();
