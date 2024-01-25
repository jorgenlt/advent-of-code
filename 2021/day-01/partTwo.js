import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map(Number);

    let result = 0;

    for (let i = 3; i < input.length; i++) {
      const num1 = input[i - 3];
      const num2 = input[i - 2];
      const num3 = input[i - 1];
      const num4 = input[i];
      const sumFirstWindow = num1 + num2 + num3;
      const sumSecondWindow = num2 + num3 + num4;

      if (sumSecondWindow > sumFirstWindow) {
        result++;
      }
    }

    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

main();
