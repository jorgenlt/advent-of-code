import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map(Number);

    for (let i = 0; i < input.length - 1; i++) {
      const num1 = input[i];

      for (let j = 1; j < input.length; j++) {
        const num2 = input[j];
        const sum = num1 + num2;

        if (sum === 2020) {
          console.log(num1 * num2);
          return;
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};

main();
