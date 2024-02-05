import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n\n")
      .map((e) => e.split("\n").map(Number));

    const calories = [];

    input.forEach((elf) => {
      calories.push(elf.reduce((acc, curr) => acc + curr, 0));
    });

    calories.sort((a, b) => b - a);

    const [elf1, elf2, elf3] = calories;

    console.log(elf1 + elf2 + elf3);
  } catch (err) {
    console.error(err);
  }
};

main();
