import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n\n")
      .map((e) => e.split("\n").map(Number));

    const mostCals = Math.max(
      ...input.map((elf) => elf.reduce((acc, curr) => acc + curr, 0))
    );

    console.log(mostCals);
  } catch (err) {
    console.error(err);
  }
};

main();
