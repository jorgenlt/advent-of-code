import { readFile } from "fs/promises";
import crypto from "crypto";
import findCharsInARow from "../../utils/findCharsInARow.js";

// const hash = crypto
//   .createHash("md5")
//   .update(string + i.toString())
//   .digest("hex");

const md5 = (salt, integer) => {
  const hash = crypto
    .createHash("md5")
    .update(salt + integer.toString())
    .digest("hex");

  return hash;
};

const hasFiveInARow = (str, char) => {
  const regex = new RegExp(`${char}{5,}`);
  return regex.test(str);
};

const isKey = (key, salt, integer) => {
  const threeInARow = findCharsInARow(key, 3);

  if (!threeInARow) return false;

  for (let i = integer + 1; i < integer + 1000; i++) {
    const nextKey = md5(salt, i);

    if (hasFiveInARow(nextKey, threeInARow)) {
      return true;
    }
  }

  return false;
};

const solvePuzzle = (salt) => {
  const validKeys = new Set();

  let integer = 0;

  while (validKeys.size < 64) {
    const key = md5(salt, integer);

    integer++;

    if (isKey(key, salt, integer)) {
      validKeys.add(key);
    }
  }
  
  return integer - 1;
};

const main = async () => {
  try {
    const input = "ahsbgdzn";

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
