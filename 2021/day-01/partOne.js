import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map(Number);

    let result = 0;
    let prevDepth = input[0];

    for (let i = 1; i < input.length; i++) {
      const currentDepth = input[i];
      if (currentDepth > prevDepth) {
        result++;
      }
      prevDepth = currentDepth;
    }

    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

main();
