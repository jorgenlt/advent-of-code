import { readLines } from "../utils/readLines.js";

const main = async () => {
  try {
    const input = await readLines("input.txt");

    let sumExtrapolatedValues = 0;

    input.forEach((line) => {
      const sequence = line.match(/\-?\d+/g).map(Number);
      let nextSequence = [sequence];

      let i = 0;

      // Calculating extrapolated values
      while (true) {
        let zero = true;
        nextSequence[i + 1] = [];

        // Calculating the difference between adjacent values in the sequence
        nextSequence[i].slice(0, -1).forEach((value, j) => {
          let diff = nextSequence[i][j + 1] - value;
          nextSequence[i + 1][j] = diff;
          zero = zero && diff === 0;
        });

        // Break if all differences are zero
        if (zero) break;

        i++;
      }

      // Adding zero at the beginning of the last sequence
      nextSequence[nextSequence.length - 1].unshift(0);

      let nextValue = 0;

      // Reversing the sequences, calculating the next value
      nextSequence
        .slice()
        .reverse()
        .forEach((item, k) => {
          if (k > 0) {
            nextValue = item[0] - nextSequence[nextSequence.length - k][0];
            nextSequence[nextSequence.length - k - 1].unshift(nextValue);
          }
        });

      sumExtrapolatedValues += nextValue;
    });

    console.log(sumExtrapolatedValues);
  } catch (err) {
    throw err;
  }
};

main();
