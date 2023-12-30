import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input2.txt", "utf-8"))
      .trim()
      .split("")
      .map(Number);

    let sum = 0;

    for (let i = 0; i < (input.length / 2); i++) {
      const num = input[i];

      let nextNum = input[i + ((input.length) / 4)]

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
