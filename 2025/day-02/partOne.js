import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input
    .trim()
    .split(",")
    .map((e) => e.split("-").map(Number));
};

const solvePuzzle = (input) => {
  const idRanges = parseInput(input);

  let sumInvalidIds = 0;

  for (const idRange of idRanges) {
    const [firstId, lastId] = idRange;

    for (let id = firstId; id <= lastId; id++) {
      const strNum = id.toString();
      const firstHalf = strNum.slice(0, strNum.length / 2);
      const secondHalf = strNum.slice(strNum.length / 2);

      if (firstHalf === secondHalf) {
        sumInvalidIds += id;
      }
    }
  }

  return sumInvalidIds;
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
