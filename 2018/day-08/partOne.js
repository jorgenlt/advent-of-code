import { readFile } from "fs/promises";

const parseInput = (input) => input.split(" ").map(Number);

const parseNode = (data, startIndex) => {
  let index = startIndex;
  const numChildren = data[index++];
  const numMetadata = data[index++];
  let metadataSum = 0;

  for (let i = 0; i < numChildren; i++) {
    const result = parseNode(data, index);
    metadataSum += result.metadataSum;
    index = result.index;
  }

  for (let i = 0; i < numMetadata; i++) {
    metadataSum += data[index++];
  }

  return { metadataSum, index };
};

const solvePuzzle = (input) => {
  const data = parseInput(input);

  const result = parseNode(data, 0);

  return result.metadataSum;
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
