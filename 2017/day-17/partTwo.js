const solvePuzzle = (steps) => {
  let currentPos = 0;
  let valueAfterZero = 0;

  for (let i = 1; i <= 50000000; i++) {
    currentPos = ((currentPos + steps) % i) + 1;

    if (currentPos === 1) {
      valueAfterZero = i;
    }
  }

  return valueAfterZero;
};

const main = async () => {
  try {
    const steps = 371;

    console.log(solvePuzzle(steps));
  } catch (err) {
    console.error(err);
  }
};

main();
