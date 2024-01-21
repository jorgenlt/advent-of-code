import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim().split("\n");

    let validCount = 0;

    input.forEach((pwList) => {
      const [_, least, most, letter, password] = pwList.match(
        /(\d+)-(\d+) (\w): (\w+)/
      );

      const letterRepeats = password
        .split("")
        .filter((e) => e === letter).length;

      if (letterRepeats >= least && letterRepeats <= most) {
        validCount++;
      }
    });

    console.log(validCount);
  } catch (err) {
    console.error(err);
  }
};

main();
