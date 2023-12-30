import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("")
      .map(Number);

    let sum = 0;

    for (let i = 0; i < input.length; i++) {
      const num = input[i];

      let nextNum;

      if (i === input.length - 1) {
        nextNum = input[0];
      } else {
        nextNum = input[i + 1];
      }

      if (num === nextNum) {
        sum += num;
      }
    }

    console.log(sum);
  } catch (err) {
    console.error(err);
  }
};

main();
