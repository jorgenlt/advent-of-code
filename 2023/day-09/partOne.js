import { readLines } from "../utils/readLines.js";

const main = async () => {
  try {
    const input = await readLines("input.txt");

    let sumExtrapolatedValues = 0;

    input.map((line) => {
      let i = 0;

      const sequence = [line.match(/\-?\d+/g).map(Number)];

      // Calculating the difference between the numbers.
      while (true) {
        let zero = true;
        const currentSequence = sequence[i];
        const nextSequence = [];

        // Calculating the difference between adjacent numbers.
        for (let j = 0, length = currentSequence.length - 1; j < length; j++) {
          let diff = currentSequence[j + 1] - currentSequence[j];
          nextSequence[j] = diff;

          // Checking if all differences are zero.
          zero = zero && diff === 0;
        }

        // If all differences are zero, break the loop.
        if (zero) break;

        // Push the new sequence of differences to the sequences array.
        sequence.push(nextSequence);

        i++;
      }

      // Initialize the value of the next number in the sequence.
      let nextValue = 0;

      // Reverse the sequence and add the last number of each sub-array to nextValue.
      sequence.reverse().forEach((subArray) => {
        nextValue += subArray.pop();
      });

      sumExtrapolatedValues += nextValue;
    });

    console.log(sumExtrapolatedValues);
  } catch (err) {
    // If an error occurs, throw the error.
    throw err;
  }
};

// Call the main function.
main();
