import { readFile } from "fs/promises";

const findKeyWithHighestValue = (obj) => {
  let maxKey = null;
  let maxValue = -Infinity;

  for (const key in obj) {
    if (obj[key] > maxValue) {
      maxKey = key;
      maxValue = obj[key];
    }
  }

  return maxKey;
};

const main = async () => {
  try {
    const signals = (await readFile("input.txt", "utf-8")).trim().split("\n");

    const charMap = new Map();

    signals.forEach((signal) => {
      for (let i = 0; i < signal.length; i++) {
        const char = signal[i];
        const pos = i.toString();

        if (!charMap.has(pos)) {
          charMap.set(pos, {});
        }

        if (!charMap.get(pos)[char]) {
          charMap.get(pos)[char] = 1;
        } else {
          charMap.get(pos)[char]++;
        }
      }
    });

    let result = "";

    [...charMap.entries()].forEach((pos) => {
      result += findKeyWithHighestValue(pos[1]);
    });

    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

main();
