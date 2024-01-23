import { readFile } from "fs/promises";

const countUniqueLetters = (str) => {
  const uniqueLetters = new Set(str);
  return uniqueLetters.size;
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

    input.forEach((group) => {
      const groupStr = group.join("");
      const uniqueQuestions = countUniqueLetters(groupStr);

      questionCount += uniqueQuestions;
    });

    console.log(questionCount);
  } catch (err) {
    console.error(err);
  }
};

main();
