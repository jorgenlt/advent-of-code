import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input
    .trim()
    .split(",")
    .map((e) => e.split("-").map(Number));
};

const isInvalid = (id) => {
  const strNum = id.toString();
  const numLen = strNum.length;

  for (let seqLen = 1; seqLen <= numLen / 2; seqLen++) {
    if (numLen % seqLen !== 0) continue;

    const seq = strNum.slice(0, seqLen);
    const repeated = seq.repeat(numLen / seqLen);

    if (repeated === strNum) return true;
  }

  return false;
};

const solvePuzzle = (input) => {
  const idRanges = parseInput(input);

  let sumInvalidIds = 0;

  for (const idRange of idRanges) {
    const [firstId, lastId] = idRange;

    for (let id = firstId; id <= lastId; id++) {
      if (isInvalid(id)) {
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
