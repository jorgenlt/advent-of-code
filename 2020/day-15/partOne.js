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

  for (let turn = startingNumbers.length + 1; turn <= 2020; turn++) {
    const prevSpoken = register.get(prevNum);
    let nextNum;

    if (prevSpoken.length === 1) {
      nextNum = 0;
    } else {
      const [secondLast, last] = prevSpoken.slice(-2);
      nextNum = last - secondLast;
    }

    if (register.has(nextNum)) {
      register.set(nextNum, [...register.get(nextNum), turn]);
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
