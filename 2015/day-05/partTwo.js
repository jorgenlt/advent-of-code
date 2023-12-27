import { readFile } from "fs/promises";

const validateString = (str) => {
  // Rule 1: Pair repeats
  const hasPairRepeat = /([a-zA-Z]{2}).*\1/.test(str);

  // Rule 2: Single letter repeat
  const hasLetterRepeat = /([a-zA-Z]).{1}\1/.test(str);

  return hasPairRepeat && hasLetterRepeat;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf8")).trim().split("\n");

    let niceCount = 0;

    input.forEach((str) => {
      if (validateString(str)) {
        niceCount++;
      }
    });

    console.log(niceCount);
  } catch (err) {
    console.error(err);
  }
};

main();
