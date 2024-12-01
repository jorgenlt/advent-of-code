import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim().split("\n");

    // Create two arrays: left list and right list.
    const leftList = [];
    const rightList = [];

    input.forEach((line) => {
      const [leftNum, rightNum] = line.match(/\d+/g).map(Number);

      leftList.push(leftNum);
      rightList.push(rightNum);
    });

    // Sort the lists from smallest to largest number
    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);

    let totalDistance = 0;

    for (let i = 0; i < leftList.length; i++) {
      const leftNum = leftList[i];
      const rightNum = rightList[i];

      totalDistance += Math.abs(leftNum - rightNum);
    }

    console.log(totalDistance);
  } catch (err) {
    console.error(err);
  }
};

main();
