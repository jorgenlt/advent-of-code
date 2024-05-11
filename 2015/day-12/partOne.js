import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    const regex = /-?\d+/g;

    const allNumbers = input.matchAll(regex);

    let sum = 0;

    for (const match of allNumbers) {
      sum += Number(match[0]);
    }

    console.log(sum);
  } catch (err) {
    console.error(err);
  }
};

main();
