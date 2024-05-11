import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim().split("\n");

    let charsStrLiteralsCount = 0;

    let charsInMemoryCount = 0;

    for (let i = 0; i < input.length; i++) {
      const strLiteral = input[i];

      charsStrLiteralsCount += strLiteral.length;

      const str = strLiteral.slice(1, strLiteral.length - 1);

      let charCount = 0;
      let j = 0;
      while (j < str.length) {
        if (str[j] === "\\" && str[j + 1] === "x") {
          charCount++;
          j += 4;
        } else if ((str[j] === "\\" && str[j + 1] === '"') || str[j] === "\\") {
          charCount++;
          j += 2;
        } else {
          charCount++;
          j++;
        }
      }

      charsInMemoryCount += charCount;
    }

    console.log(charsStrLiteralsCount - charsInMemoryCount);
  } catch (err) {
    console.error(err);
  }
};

main();
