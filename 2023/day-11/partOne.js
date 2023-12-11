import { readFile } from "../utils/readFile.js";

const main = async () => {
  try {
    const input = await readFile("test.txt");

    console.log(input);
  } catch (err) {
    console.error(err);
  }
};

// Function to find unique pairs
const uniquePairs = (galaxies) => {
  const galaxiesArray = [];

  for (let i = 1; i <= 9; i++) {
    galaxiesArray.push(i);
  }

  const pairs = [];

  for (let i = 0; i < galaxiesArray.length; i++) {
    for (let j = i + 1; j < galaxiesArray.length; j++) {
      pairs.push([galaxiesArray[i], galaxiesArray[j]]);
    }
  }

  return pairs;
};

main();
