import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim().split("\n");

    // Create two arrays: left list and right list.
    const leftList = [];
    const rightListMap = new Map();

    input.forEach((line) => {
      const [leftNum, rightNum] = line.match(/\d+/g).map(Number);

      leftList.push(leftNum);

      // Use a Map object and count how many times each number is repeated in rightList
      rightListMap.set(rightNum, (rightListMap.get(rightNum) || 0) + 1);
    });

    // Calculate similarity score
    let similarityScore = 0;

    for (let i = 0; i < leftList.length; i++) {
      const leftNum = leftList[i];
      const appearsInRightList = rightListMap.get(leftNum) || 0; // Get the number of times leftNum is repeated, or 0 if it is not in the list

      similarityScore += leftNum * appearsInRightList;
    }

    console.log(similarityScore);
  } catch (err) {
    console.error(err);
  }
};

main();
