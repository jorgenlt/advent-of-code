import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((e) => e.split(" | "))
      .map((e) => [e[0].split(" "), e[1].split(" ")]);

    const result = input.reduce(
      (acc, curr) =>
        acc +
        curr[1].filter((str) => str.length <= 4 || str.length === 7).length,
      0
    );

    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

main();
