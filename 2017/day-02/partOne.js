import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((e) => e.split("\t").map(Number));

    let sum = 0;

    // Find max and min, add diff to sum
    input.forEach((line) => {
      const min = Math.min(...line);
      const max = Math.max(...line);
      const diff = max - min;
      sum += diff;
    });

    console.log(sum);
  } catch (err) {
    console.error(err);
  }
};

main();
