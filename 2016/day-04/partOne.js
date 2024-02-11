import { readFile } from "fs/promises";

const findFiveMostCommonLetters = (str) => {
  const charCount = {};

  // Count occurrences of each character
  for (const char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Convert the character count object to an array of [char, count] pairs
  const charCountArray = Object.entries(charCount);

  // Sort the array first by count in descending order, then alphabetically by character
  charCountArray.sort((a, b) => {
    if (b[1] !== a[1]) {
      return b[1] - a[1];
    } else {
      return a[0].localeCompare(b[0]);
    }
  });

  // Take the first five elements (most common letters)
  const mostCommonLetters = charCountArray.slice(0, 5).map((pair) => pair[0]);

  return mostCommonLetters;
};

const main = async () => {
  try {
    const rooms = (await readFile("input.txt", "utf-8")).trim().split("\n");

    let sumSectorId = 0;

    rooms.forEach((room) => {
      const name = room.split(/\d+/)[0].replaceAll("-", "");
      const id = Number(room.match(/\d+/g));
      const checksum = room.split("[")[1].replace("]", "");

      const mostCommon = findFiveMostCommonLetters(name).join("");

      if (checksum === mostCommon) {
        sumSectorId += id;
      }
    });

    console.log(sumSectorId);
  } catch (err) {
    console.error(err);
  }
};

main();
