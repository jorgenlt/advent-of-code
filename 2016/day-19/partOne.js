const findLargestPowerOfTwo = (participants) => {
  let p = parseInt(Math.log(participants) / Math.log(2), 10);
  return Math.pow(2, p);
};

const solveJosephusProblem = (participants) => {
  // Finding the largest power of 2 that is less or equal to
  // number of participants
  const largestPowerOfTwo = findLargestPowerOfTwo(participants);

  // Solving Josephus problem
  return 2 * (participants - largestPowerOfTwo) + 1;
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
