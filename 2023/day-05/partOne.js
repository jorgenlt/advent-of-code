import { readFile } from "../utils/readFile.js";

const main = async () => {
  try {
    const input = (await readFile("input.csv")).split("\n\n");

    let seeds = input[0].split(" ").slice(1).map(Number);
    const blocks = input.slice(1);

    // For each block, split the lines, then split each line
    // and convert them to numbers
    const ranges = blocks.map((block) => {
      const lines = block.split(":\n")[1].split("\n");
      return lines.map((line) => line.split(" ").map(Number));
    });

    // For each range, map the seeds through it
    ranges.forEach((range) => {
      seeds = seeds.map((seed) => {
        // For each triple [a, b, c] in the range
        for (let [a, b, c] of range) {
          // If the seed is within the range [b, b+c)
          if (b <= seed && seed < b + c) {
            // Return the seed shifted by -b+a
            return seed - b + a;
          }
        }
        // If no match found in this range, return the original seed
        return seed;
      });
    });

    // Minimum value
    console.log(Math.min(...seeds));
  } catch (err) {
    console.error(err);
  }
};

main();
