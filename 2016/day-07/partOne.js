import { readFile } from "fs/promises";

const hasAbba = (str) => {
  for (let i = 3; i < str.length; i++) {
    const char1 = str[i - 3];
    const char2 = str[i - 2];
    const char3 = str[i - 1];
    const char4 = str[i];

    if (char1 !== char2 && char1 === char4 && char2 === char3) {
      return true;
    }
  }

  return false;
};

const main = async () => {
  try {
    const ips = (await readFile("input.txt", "utf-8")).trim().split("\n");

    let ipCount = 0;

    ips.forEach((ip) => {
      const outsideBrackets = [];
      const insideBrackets = [];

      ip.split(/[\[\]]/g).forEach((seq, i) => {
        if (i % 2 === 0) {
          outsideBrackets.push(seq);
        } else {
          insideBrackets.push(seq);
        }
      });

      let outsideBracketsHasAbba = false;
      let insideBracketsHasAbba = false;

      outsideBrackets.forEach((seq) => {
        if (hasAbba(seq)) {
          outsideBracketsHasAbba = true;
        }
      });

      insideBrackets.forEach((seq) => {
        if (hasAbba(seq)) {
          insideBracketsHasAbba = true;
        }
      });

      if (outsideBracketsHasAbba && !insideBracketsHasAbba) {
        ipCount++;
      }
    });

    console.log(ipCount);
  } catch (err) {
    console.error(err);
  }
};

main();
