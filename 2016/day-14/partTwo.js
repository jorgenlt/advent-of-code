import crypto from "crypto";
import findCharsInARow from "../../utils/findCharsInARow.js";

const md5 = (salt, integer) => {
  const hash = crypto
    .createHash("md5")
    .update(salt + integer.toString())
    .digest("hex");

  return hash;
};

const getStretchedHash = (hash) => {
  let key = hash;

  for (let i = 0; i < 2016; i++) {
    const hash = crypto.createHash("md5").update(key).digest("hex");

    key = hash;
  }

  return key;
};

const hasFiveInARow = (str, char) => {
  const regex = new RegExp(`${char}{5,}`);
  return regex.test(str);
};

const isKey = (key, salt, integer, hashCache) => {
  const threeInARow = findCharsInARow(key, 3);

  if (!threeInARow) return false;

  for (let i = integer + 1; i <= integer + 1000; i++) {
    const nextKey = md5(salt, i);

    let stretchedHashNextKey;

    if (hashCache.has(i)) {
      stretchedHashNextKey = hashCache.get(i);
    } else {
      stretchedHashNextKey = getStretchedHash(nextKey);
      hashCache.set(i, stretchedHashNextKey);
    }

    if (hasFiveInARow(stretchedHashNextKey, threeInARow)) {
      return true;
    }
  }

  return false;
};

const solvePuzzle = (salt) => {
  const validKeys = new Set();
  const hashCache = new Map();

  let integer = 0;

  while (validKeys.size < 64) {
    const key = md5(salt, integer);

    let stretchedHash;

    if (hashCache.has(integer)) {
      stretchedHash = hashCache.get(integer);
    } else {
      stretchedHash = getStretchedHash(key);
      hashCache.set(integer, stretchedHash);
    }

    if (isKey(stretchedHash, salt, integer, hashCache)) {
      validKeys.add(key);
      console.log(validKeys.size);
    }

    integer++;
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
