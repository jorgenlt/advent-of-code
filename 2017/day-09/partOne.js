import { readFile } from "fs/promises";

const solvePuzzle = (input) => {
  let totalScore = 0;
  let depth = 0;
  let inGarbage = false;
  let ignoreNextChar = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (ignoreNextChar) {
      ignoreNextChar = false;
      continue;
    }

    if (char === "!") {
      ignoreNextChar = true;
    } else if (inGarbage) {
      if (char === ">") {
        inGarbage = false;
      }
    } else {
      switch (char) {
        case "<":
          inGarbage = true;
          break;
        case "{":
          depth++;
          break;
        case "}":
          totalScore += depth;
          depth--;
          break;
      }
    }
  }

  console.log(totalScore);
  return totalScore;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    solvePuzzle(input);
  } catch (err) {
    console.error(err);
  }
};

main();
