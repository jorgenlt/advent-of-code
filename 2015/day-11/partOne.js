import { readFile } from "fs/promises";

const getCharPos = (char) => char.charCodeAt(0) - 96;

const hasStraight = (str) => {
  const positionsOfChars = str.split("").map((char) => getCharPos(char));

  for (let i = 0; i < positionsOfChars.length - 2; i++) {
    const char1 = positionsOfChars[i];
    const char2 = positionsOfChars[i + 1];
    const char3 = positionsOfChars[i + 2];

    if (char2 === char1 + 1 && char3 === char2 + 1) {
      return true;
    }
  }

  return false;
};

const hasLegalChars = (str) => !/[iol]/.test(str);

const hasTwoPairs = (str) => {
  const pairs = new Set();
  let pairCount = 0;

  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === str[i + 1]) {
      if (!pairs.has(str[i])) {
        pairs.add(str[i]);
        pairCount++;
      }
    }
  }

  return pairCount >= 2;
};

const isPasswordValid = (str) =>
  hasStraight(str) && hasLegalChars(str) && hasTwoPairs(str);

const incrementPassword = (password) => {
  let newPassword = password.split("");

  for (let i = newPassword.length - 1; i >= 0; i--) {
    let index = getCharPos(newPassword[i]);
    if (index === 26) {
      newPassword[i] = "a";
    } else {
      newPassword[i] = String.fromCharCode(
        (getCharPos(newPassword[i]) % 26) + 97
      );
      break;
    }
  }

  return newPassword.join("");
};

const main = async () => {
  try {
    const input = await readFile("input.txt", "utf-8");

    let partOnePassword = input;

    while (!isPasswordValid(partOnePassword)) {
      partOnePassword = incrementPassword(partOnePassword);
    }

    let partTwoPassword = incrementPassword(partOnePassword);

    while (!isPasswordValid(partTwoPassword)) {
      partTwoPassword = incrementPassword(partTwoPassword);
    }

    console.log("Part one:", partOnePassword);
    console.log("Part two:", partTwoPassword);
  } catch (err) {
    console.error(err);
  }
};

main();
