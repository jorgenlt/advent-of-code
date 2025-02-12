import findLargestPower from "../../utils/findLargestPower.js";

const solveJosephusProblem = (participants) => {
  // Finding the largest power of 2 that is less or equal to
  // number of participants
  const largestPowerOfThree = findLargestPower(participants, 3);

  // Solving Josephus problem
  return participants - largestPowerOfThree;
};

const solvePuzzle = (input) => {
  return solveJosephusProblem(input);
};

const main = async () => {
  try {
    const input = 3018458;

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
