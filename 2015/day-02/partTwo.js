import fs from 'fs/promises'

const ribbonLength = (a, b, c) => {
  const [min, mid, max] = [a, b, c].sort((a, b) => a - b);

  const ribbonLen = 2 * min + 2 * mid;
  const bowLength = a * b * c;

  return ribbonLen + bowLength;
};

const main = async () => {
  const input = (await fs.readFile("input.txt", "utf8"))
    .trim()
    .split("\n")
    .map((e) => e.split("x").map(Number));

  const result = input.reduce((acc, box) => acc + ribbonLength(...box), 0);

  console.log(result);
};

main();
