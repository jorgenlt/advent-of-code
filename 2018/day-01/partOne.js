import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map(Number);

    const currentFreq = input.reduce((acc, num) => acc + num);

    console.log(currentFreq);
  } catch (err) {
    console.error(err);
  }
};

main();
