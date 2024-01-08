import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map(Number);

    // Storing unique values in a Set
    const freqs = new Set();
    
    let currentFreq = 0;

    let i = 0;
    while (true) {
      currentFreq += input[i];

      if (freqs.has(currentFreq)) {
        break;
      }

      freqs.add(currentFreq);

      // If i is last index, set to 0. Else iterate by 1.
      i === input.length - 1 ? (i = 0) : i++;
    }

    console.log(currentFreq);

    return;
  } catch (err) {
    console.error(err);
  }
};

main();
