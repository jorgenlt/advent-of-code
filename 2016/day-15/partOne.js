import { readFile } from "fs/promises";

const parseInput = (input) => {
  const disks = [];

  input.split("\n").forEach((l) => {
    const [diskNum, posNum, _, initialPos] = l.match(/\d+/g).map(Number);
    disks.push({
      diskNum,
      posNum,
      initialPos,
    });
  });

  return disks;
};

// For the slot to be in place, we need:
// (initial position + T + i) mod (number of positions) = 0.
const isSlotInPlace = (initialPos, time, diskNum, posNum) => {
  if ((initialPos + time + diskNum) % posNum === 0) {
    return true;
  }
  return false;
};

const solvePuzzle = (input) => {
  const disks = parseInput(input);

  let allDisksAligned = false;
  let time = 0;

  while (!allDisksAligned) {
    allDisksAligned = disks.every((disk) =>
      isSlotInPlace(disk.initialPos, time, disk.diskNum, disk.posNum)
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
