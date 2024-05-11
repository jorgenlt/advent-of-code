import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim().split("\n");

    let charsStrLiteralsCount = 0;

    let encodedcharsCount = 0;

    for (let i = 0; i < input.length; i++) {
      const strLiteral = input[i];

      charsStrLiteralsCount += strLiteral.length;

      // Using JSON.stringify to escape special characters and calculate
      // the length of the encoded string
      encodedcharsCount += JSON.stringify(strLiteral).length;
    }

    console.log(encodedcharsCount - charsStrLiteralsCount);
  } catch (err) {
    console.error(err);
  }
};

main();
