import { readFile } from "fs/promises";

const indexOfMax = (arr) => {
  if (arr.length === 0) {
    return -1;
  }

  let max = arr[0];
  let maxIndex = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
};

const redistributeBlocks = (banks) => {
  const largestBankIndex = indexOfMax(banks);

  // Setting intital index to start redist. from the next index.
  let currentIndex =
    largestBankIndex === banks.length - 1 ? 0 : largestBankIndex + 1;

  let blocks = banks[largestBankIndex];

  banks[largestBankIndex] = 0;
  while (blocks > 0) {
    banks[currentIndex]++;
    blocks--;

    if (currentIndex === banks.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
  }

  return banks;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split(" ")
      .map(Number);

    let cycleCount = 0;

    let banks = [...input];

    // Empty array to save config before each cycle
    const configs = new Set();

    while (!configs.has(banks.join())) {
      // Save current config
      configs.add(banks.join());

      // Redistribute and update banks
      banks = redistributeBlocks(banks);

      cycleCount++;
    }

    console.log("cycleCount1:", cycleCount);

    // To find the size of the cycle, repeat again from
    // the first repeated config
    let cycleCount2 = 0;

    let banks2 = [...banks];

    // Empty array to save config before each cycle
    const configs2 = new Set();

    while (!configs2.has(banks2.join())) {
      // Save current config
      configs2.add(banks2.join());

      // Redistribute and update banks
      banks2 = redistributeBlocks(banks2);

      cycleCount2++;
    }

    console.log("cycleCount2:", cycleCount2);
  } catch (err) {
    console.error(err);
  }
};

main();
