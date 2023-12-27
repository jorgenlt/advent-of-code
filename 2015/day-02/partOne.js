const fs = require("node:fs/promises");

const main = async () => {
  const input = (await fs.readFile("input.txt", "utf8"))
    .trim()
    .split("\n")
    .map((e) => e.split("x").map(Number));

  let result = 0;

  input.forEach((box) => {
    const [a, b, c] = box;

    const side1 = 2 * a * b;
    const side2 = 2 * b * c;
    const side3 = 2 * a * c;

    const surfaceArea = side1 + side2 + side3;

    const smallestSideArea =
      [side1, side2, side3].reduce((a, b) => Math.min(a, b)) / 2;

    result += surfaceArea + smallestSideArea;
  });

  console.log(result);  
};

main();
