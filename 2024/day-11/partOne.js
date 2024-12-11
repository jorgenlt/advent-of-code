import { readFile } from "fs/promises";

/*
Rules:
1. If the stone is engraved with the number 0, it is replaced 
by a stone engraved with the number 1.

2. If the stone is engraved with a number that has an even number 
of digits, it is replaced by two stones. The left half of the 
digits are engraved on the new left stone, and the right half 
of the digits are engraved on the new right stone. (The new 
numbers don't keep extra leading zeroes: 1000 would become stones
10 and 0.)

3. If none of the other rules apply, the stone is replaced by a new stone; 
the old stone's number multiplied by 2024 is engraved on the new stone.
*/

const transformStones = (stones) => {
  const result = [];

  stones.forEach((stone) => {
    if (stone === "0") {
      result.push("1");
    } else if (stone.length % 2 === 0) {
      const left = Number(
        stone
          .split("")
          .slice(0, stone.length / 2)
          .join("")
      ).toString();
      const right = Number(
        stone
          .split("")
          .slice(stone.length / 2, stone.length)
          .join("")
      ).toString();

      result.push(left);
      result.push(right);
    } else {
      result.push((Number(stone) * 2024).toString());
    }
  });

  return result;
};
const main = async () => {
  try {
    const input = (await readFile("test.txt", "utf-8")).trim().split(" ");

    let stones = [...input];

    for (let i = 0; i < 25; i++) {
      stones = transformStones(stones);
    }

    console.log(stones.length);
  } catch (err) {
    console.error(err);
  }
};

main();
