import { readFile } from "fs/promises";
import transposeMatrix from "../../utils/transposeMatrix.js";

const parseInput = (input) => {
  const locks = [];
  const keys = [];

  input.split("\n\n").forEach((section) => {
    if (section.startsWith("#")) {
      locks.push(section.split("\n").map((l) => l.split("")));
    } else {
      keys.push(section.split("\n").map((l) => l.split("")));
    }
  });

  return {
    locks,
    keys,
  };
};

const getHeights = (lockOrKey) => {
  const heights = [];

  transposeMatrix(lockOrKey).forEach((e) => {
    heights.push(e.join("").match(/\#/g).length);
  });

  return heights;
};

const arePairs = (lock, key, availableSpace) => {
  let arePairs = true;

  for (let i = 0; i < lock.length; i++) {
    const lockHeight = lock[i];
    const keyHeight = key[i];

    if (lockHeight + keyHeight > availableSpace) {
      arePairs = false;
    }
  }

  return arePairs;
};

const countPairs = (locksHeights, keysHeights, availableSpace) => {
  let lockKeyPairs = 0;

  locksHeights.forEach((lock) => {
    keysHeights.forEach((key) => {
      if (arePairs(lock, key, availableSpace)) lockKeyPairs++;
    });
  });

  return lockKeyPairs;
};

const solvePuzzle = (input) => {
  const { locks, keys } = parseInput(input);
  const availableSpace = locks[0].length;

  const locksHeights = locks.map((lock) => getHeights(lock));
  const keysHeights = keys.map((key) => getHeights(key));

  const pairs = countPairs(locksHeights, keysHeights, availableSpace);

  return pairs;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
