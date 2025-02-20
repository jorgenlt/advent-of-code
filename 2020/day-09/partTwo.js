import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input.split("\n").map(Number);
};

const isValid = (prevNums, number) => {
  for (let i = 0; i < prevNums.length; i++) {
    const numA = prevNums[i];

    for (let j = 0; j < prevNums.length; j++) {
      const numB = prevNums[j];

      if (numA === numB) continue;

      if (numA + numB === number) {
        return true;
      }
    }
  }

  return false;
};

const getInvalidNumber = (numbers, preambleSize) => {
  for (let i = preambleSize; i < numbers.length; i++) {
    const number = numbers[i];
    const prevNums = numbers.slice(i - preambleSize, i);

    if (!isValid(prevNums, number)) {
      return number;
    }
  }
};

const getSum = (arr) => {
  return arr.reduce((prev, curr) => prev + curr);
};

const solvePuzzle = (input) => {
  const numbers = parseInput(input);
  const preambleSize = 25;
  const invalidNumber = getInvalidNumber(numbers, preambleSize);

  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    const numbersSet = [number];
    let sum = getSum(numbersSet);

    for (let j = i + 1; sum < invalidNumber; j++) {
      sum = getSum(numbersSet);

      if (sum === invalidNumber) {
        const min = Math.min(...numbersSet);
        const max = Math.max(...numbersSet);

        return min + max;
      }

      numbersSet.push(numbers[j]);
    }
  }
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
