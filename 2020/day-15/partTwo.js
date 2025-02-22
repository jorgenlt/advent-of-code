const parseInput = (input) => {
  return input.split(",").map(Number);
};

const solvePuzzle = (input) => {
  const startingNumbers = parseInput(input);

  const register = new Map();

  for (let i = 0; i < startingNumbers.length; i++) {
    const number = startingNumbers[i];
    register.set(number, [i + 1]);
  }

  let prevNum = startingNumbers[startingNumbers.length - 1];

  for (let turn = startingNumbers.length + 1; turn <= 30000000; turn++) {
    const prevSpoken = register.get(prevNum);
    let nextNum;

    if (prevSpoken.length === 1) {
      nextNum = 0;
    } else {
      nextNum =
        prevSpoken[prevSpoken.length - 1] - prevSpoken[prevSpoken.length - 2];
    }

    if (register.has(nextNum)) {
      const nextNumPrevSpoken = register.get(nextNum);
      register.set(nextNum, [
        nextNumPrevSpoken[nextNumPrevSpoken.length - 1],
        turn,
      ]);
    } else {
      register.set(nextNum, [turn]);
    }

    prevNum = nextNum;
  }

  return prevNum;
};

const main = async () => {
  try {
    const input = "11,18,0,20,1,7,16";

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
