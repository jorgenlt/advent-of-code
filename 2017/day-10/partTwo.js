import { readFile } from "fs/promises";

const knotHash = (input) => {
  // Convert input string to ASCII codes and suffix
  const lengths = [...input.trim()]
    .map((char) => char.charCodeAt(0))
    .concat([17, 31, 73, 47, 23]);
  const numbers = Array.from({ length: 256 }, (_, i) => i);
  let currentPosition = 0;
  let skipSize = 0;

  // 64 rounds of knotting
  for (let round = 0; round < 64; round++) {
    for (const length of lengths) {
      if (length > numbers.length) continue;

      // Reverse
      const sublist = [];
      for (let i = 0; i < length; i++) {
        sublist.push(numbers[(currentPosition + i) % numbers.length]);
      }
      sublist.reverse();

      for (let i = 0; i < length; i++) {
        numbers[(currentPosition + i) % numbers.length] = sublist[i];
      }

      currentPosition = (currentPosition + length + skipSize) % numbers.length;
      skipSize++;
    }
  }

  // Calculate dense hash
  const denseHash = [];
  for (let i = 0; i < 256; i += 16) {
    let xorResult = numbers[i];
    for (let j = 1; j < 16; j++) {
      xorResult ^= numbers[i + j];
    }
    denseHash.push(xorResult);
  }

  // Convert dense hash to hexadecimal string
  const hexString = denseHash
    .map((num) => num.toString(16).padStart(2, "0"))
    .join("");
  return hexString;
};

const solvePuzzle = (input) => {
  const result = knotHash(input);

  console.log(result);

  return result;
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
