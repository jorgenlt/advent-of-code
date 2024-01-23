import { readFile } from "fs/promises";

const split = (low, high, splitDirection) => {
  // Calculate the midpoint of the range
  const mid = Math.floor((low + high) / 2);

  // Determine the new range based on the split direction
  if (splitDirection === "F" || splitDirection === "L") {
    // Front or Left split: return new range from low to mid
    return [low, mid];
  } else {
    // Back or Right split: return new range from mid + 1 to high
    return [mid + 1, high];
  }
};

const findRowCol = (instruction, low, high) => {
  for (let i = 0; i < instruction.length; i++) {
    const section = instruction[i];
    const [newLow, newHigh] = split(low, high, section);
    low = newLow;
    high = newHigh;
  }

  if (low === high) {
    return low;
  } else {
    console.error("No row or col was found.");
  }
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim().split("\n");

    let highestId = 0;

    input.forEach((line) => {
      const rowInstruction = line.substring(0, 7);
      const colInstruction = line.substring(7, 10);

      const row = findRowCol(rowInstruction, 0, 127);
      const col = findRowCol(colInstruction, 0, 7);

      const seatId = row * 8 + col;

      if (seatId > highestId) {
        highestId = seatId;
      }
    });

    console.log(highestId);
  } catch (err) {
    console.error(err);
  }
};

main();
