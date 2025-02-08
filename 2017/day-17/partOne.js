const solvePuzzle = (steps) => {
  const buffer = [0];

  let currentPos = 0;

  for (let i = 1; i < 2018; i++) {
    currentPos = (currentPos + steps) % buffer.length;

    buffer.splice(currentPos + 1, 0, i);

    currentPos++;
  }

  return buffer[buffer.indexOf(2017) + 1];
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
