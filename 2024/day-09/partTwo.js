import { readFile } from "fs/promises";

const extractDiskMap = (input) => {
  const diskMap = [];
  let id = 0;

  input.split("").forEach((num, i) => {
    if (i % 2 === 0) {
      for (let j = 0; j < num; j++) {
        diskMap.push(id);
      }
      id++;
    } else {
      for (let k = 0; k < num; k++) {
        diskMap.push(".");
      }
    }
  });

  return diskMap;
};

const moveFiles = (diskMap) => {
  const filePositions = {};

  // Getting index positions of each file
  diskMap.forEach((block, i) => {
    if (!isNaN(block)) {
      if (!filePositions[block]) {
        filePositions[block] = [];
      }
      filePositions[block].push(i);
    }
  });

  // Move files starting with the highest ID
  Object.keys(filePositions)
    .sort((a, b) => b - a)
    .forEach((fileId) => {
      const positions = filePositions[fileId];
      const fileSize = positions.length;

      // Looking for potential starting positions on the disk map
      for (let i = 0; i <= positions[0]; i++) {
        // Find a potential space for the file
        const potentialSpace = diskMap.slice(i, i + fileSize);

        // Check if all blocks in the potential space are free, "."
        const isSpaceFree = potentialSpace.every((block) => block === ".");

        if (isSpaceFree) {
          // Mark original positions as free, "."
          positions.forEach((pos) => {
            diskMap[pos] = ".";
          });

          // Actually move the file to the new position starting from i
          for (let j = 0; j < fileSize; j++) {
            diskMap[i + j] = fileId;
          }

          // Exit the loop after moving the file
          break;
        }
      }
    });

  return diskMap;
};

const calculateChecksum = (movedBlocks) => {
  let sum = 0;

  for (let i = 0; i < movedBlocks.length; i++) {
    if (!isNaN(movedBlocks[i])) {
      sum += movedBlocks[i] * i;
    }
  }

  return sum;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    const diskMap = extractDiskMap(input);

    const movedBlocks = moveFiles(diskMap);

    const result = calculateChecksum(movedBlocks);

    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

main();
