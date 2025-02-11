import { readFile } from "fs/promises";

const parseInput = (input) => {
  const discs = [];

  input.split("\n").forEach((l) => {
    const [discNum, posNum, _, initialPos] = l.match(/\d+/g).map(Number);
    discs.push({
      discNum,
      posNum,
      initialPos,
    });
  });

  return discs;
};

// For the slot to be in place, we need:
// (initial position + T + i) mod (number of positions) = 0.
const isSlotInPlace = (initialPos, time, discNum, posNum) => {
  if ((initialPos + time + discNum) % posNum === 0) {
    return true;
  }
  return false;
};

const solvePuzzle = (input) => {
  const discs = parseInput(input);

  // Part Two: Add the new disc
  discs.push({
    discNum: 7,
    posNum: 11,
    initialPos: 0,
  });

  let alldiscsAligned = false;
  let time = 0;

  while (!alldiscsAligned) {
    alldiscsAligned = discs.every((disc) =>
      isSlotInPlace(disc.initialPos, time, disc.discNum, disc.posNum)
    );

    time++;
  }

  return time - 1;
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
