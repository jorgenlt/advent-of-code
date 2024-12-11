import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim().split(" ");

    let frequencyMap = {};

    // Setup the frequencies
    input.forEach((num) => {
      frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    });

    for (let i = 0; i < 75; i++) {
      const newFrequencyMap = {};

      // Process each number in the current frequency map
      for (const [key, count] of Object.entries(frequencyMap)) {
        let newNumbers;

        // Rule 1: If number is 0, replace with 1
        if (key === "0") {
          newNumbers = ["1"];
        }
        // Rule 2: If even number of digits, split in half
        else if (key.length % 2 === 0) {
          newNumbers = [
            Number(key.slice(0, key.length / 2)).toString(),
            Number(key.slice(key.length / 2)).toString(),
          ];
        }
        // Rule 3: Multiply by 2024
        else {
          newNumbers = [(Number(key) * 2024).toString()];
        }

        // Update new frequency map
        newNumbers.forEach((num) => {
          newFrequencyMap[num] = (newFrequencyMap[num] || 0) + count;
        });
      }

      frequencyMap = newFrequencyMap;
    }

    const totalCount = Object.values(frequencyMap).reduce(
      (sum, count) => sum + count,
      0
    );

    console.log(totalCount);
  } catch (err) {
    console.error(err);
  }
};

main();
