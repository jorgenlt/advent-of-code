import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim().split("\n");

    let twoLetterCount = 0;
    let threeLetterCount = 0;

    input.forEach((line) => {
      const map = new Map();

      line.split("").forEach((letter) => {
        if (map.has(letter)) {
          map.set(letter, map.get(letter) + 1);
        } else {
          map.set(letter, 1);
        }
      });

      let foundTwo = false;
      let foundThree = false;

      map.forEach((value, key) => {
        if (value === 2 && foundTwo === false) {
          foundTwo = true;
          twoLetterCount++;
        }

        if (value === 3 && foundThree === false) {
          foundThree = true;
          threeLetterCount++;
        }
      });
    });

    const checkSum = twoLetterCount * threeLetterCount;

    console.log(checkSum);
  } catch (err) {
    console.error(err);
  }
};

main();
