import { readFile } from "fs/promises";

const parseInput = (input) => input.split("\n").map(Number);

const mix = (secretNumber, value) => secretNumber ^ value;

const prune = (secretNumber) => {
  const modulus = 16777216;
  const modded = secretNumber % modulus;
  return modded < 0 ? modded + modulus : modded;
};

const getNextSecretNumber = (secretNumber) => {
  let result = prune(mix(secretNumber, secretNumber * 64));
  result = prune(mix(result, Math.floor(result / 32)));
  return prune(mix(result, result * 2048));
};

const getFinalSecretNumber = (initialNumber, iterations) => {
  let secretNumber = initialNumber;

  for (let i = 0; i < iterations; i++) {
    secretNumber = getNextSecretNumber(secretNumber);
  }

  return secretNumber;
};

const solvePuzzle = (input) => {
  const sequenceMap = new Map();
  let largestSum = 0;
  const initialNumbers = parseInput(input);

  initialNumbers.forEach((initialNumber, currentIndex) => {
    const currentSequence = [0, 0, 0, 0];
    let sequenceIndex = 0;

    for (let i = 0; i < 2000; i++) {
      const nextNum = getFinalSecretNumber(initialNumber, 1);
      const currentSequencePart = (nextNum % 10) - (initialNumber % 10) + 9;

      if (sequenceIndex >= 4) {
        currentSequence.shift();
        currentSequence.push(currentSequencePart);

        const sequenceKey = currentSequence.join(",");
        let sequence = sequenceMap.get(sequenceKey);

        if (!sequence) {
          sequence = { sum: 0, lastProcessed: -1 };
          sequenceMap.set(sequenceKey, sequence);
        }

        if (sequence.lastProcessed !== currentIndex) {
          sequence.lastProcessed = currentIndex;
          sequence.sum += nextNum % 10;

          if (sequence.sum > largestSum) {
            largestSum = sequence.sum;
          }
        }
      } else {
        currentSequence[sequenceIndex] = currentSequencePart;
        sequenceIndex++;
      }

      initialNumber = nextNum;
    }
  });

  return largestSum;
};

const main = async () => {
  try {
    const input = await readFile("input.txt", "utf-8");
    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
