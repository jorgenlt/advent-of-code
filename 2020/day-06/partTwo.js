import { readFile } from "fs/promises";

const countCommonLetters = (arr) => {
  if (arr.length === 1) {
    return arr[0].length;
  }

  const commonLetters = arr.reduce(
    (acc, currentString) => {
      const currentSet = new Set(currentString);

      return acc.filter((letter) => currentSet.has(letter));
    },
    [...new Set(arr[0])]
  );

  return commonLetters.length;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n\n")
      .map((e) => {
        return e.split("\n");
      });

    let questionCount = 0;

    input.forEach((group) => (questionCount += countCommonLetters(group)));

    console.log(questionCount);
  } catch (err) {
    console.error(err);
  }
};

main();
