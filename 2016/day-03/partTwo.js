import { readFile } from "fs/promises";

const isValidTriangle = (a, b, c) => {
  if (a + b > c && a + c > b && b + c > a) {
    return true;
  }
  return false;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((e) => e.trim().replace(/\s+/g, ",").split(",").map(Number));

    const newInput = [];

    for (let i = 0; i < input.length; i += 3) {
      newInput.push([input[i][0], input[i + 1][0], input[i + 2][0]]);
      newInput.push([input[i][1], input[i + 1][1], input[i + 2][1]]);
      newInput.push([input[i][2], input[i + 1][2], input[i + 2][2]]);
    }

    let possibleCount = 0;

    newInput.forEach((e) => {
      const [a, b, c] = e;

      if (isValidTriangle(a, b, c)) {
        possibleCount++;
      }
    });

    console.log(possibleCount);
  } catch (err) {
    console.error(err);
  }
};

main();
