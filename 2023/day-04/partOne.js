import { readLines } from "../utils/readLines.js";

const main = async () => {
  try {
    const input = await readLines("input.csv");
    console.log(input);
  } catch (err) {
    console.error(err);
  }
};

// Call the main function
main();
