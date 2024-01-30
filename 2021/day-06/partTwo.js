import { readFile } from "fs/promises";

const main = async () => {
  try {
    const counts = Array(9).fill(0);

    (await readFile("input.txt", "utf-8"))
      .trim()
      .split(",")
      .map(Number)
      .forEach((e) => (counts[e] += 1));

    for (let i = 0; i < 256; i++) {
      const newCount = counts.shift();
      counts[6] += newCount;
      counts.push(newCount);
    }

    const result = counts.reduce((prev, curr) => prev + curr, 0);

    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

main();
