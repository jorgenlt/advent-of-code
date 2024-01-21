import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim().split("\n");

    let validCount = 0;

    input.forEach((pwList) => {
      const [_, pos1, pos2, letter, password] = pwList.match(
        /(\d+)-(\d+) (\w): (\w+)/
      );

      const isLetterPos1 = password[pos1 - 1] === letter;
      const isLetterPos2 = password[pos2 - 1] === letter;

      if ((isLetterPos1 && !isLetterPos2) || (!isLetterPos1 && isLetterPos2)) {
        validCount++;
      }
    });

    console.log(validCount);
  } catch (err) {
    console.error(err);
  }
};

main();
