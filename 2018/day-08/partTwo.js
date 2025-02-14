import { readFile } from "fs/promises";

const parseInput = (input) => input.split(" ").map(Number);

const parseNode = (data, startIndex) => {
  let index = startIndex;
  const numChildren = data[index++];
  const numMetadata = data[index++];
  let metadataSum = 0;
  let childValues = [];

  // Process all child nodes
  for (let i = 0; i < numChildren; i++) {
    const result = parseNode(data, index);
    metadataSum += result.metadataSum;
    childValues.push(result.value);
    index = result.index;
  }

  let metadataEntries = [];
  // Process metadata entries
  for (let i = 0; i < numMetadata; i++) {
    const entry = data[index++];
    metadataSum += entry;
    metadataEntries.push(entry);
  }

  // Compute the node's value
  let value;
  if (numChildren === 0) {
    // If no children, value is the sum of metadata
    value = metadataEntries.reduce((sum, entry) => sum + entry, 0);
  } else {
    // If there are children, metadata entries reference children
    value = metadataEntries.reduce((sum, entry) => {
      if (entry >= 1 && entry <= childValues.length) {
        return sum + childValues[entry - 1];
      }
      return sum;
    }, 0);
  }

  return { metadataSum, value, index };
};

const solvePuzzle = (input) => {
  const data = parseInput(input);
  const result = parseNode(data, 0);

  return result.value;
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
