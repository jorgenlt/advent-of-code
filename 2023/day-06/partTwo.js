import { readFile } from "../utils/readFile.js";
import { readLines } from "../utils/readLines.js";

const main = async () => {
  try {
    console.time("Took");
    const input = await readLines("input.txt");

    const time = Number(input[0].split(":")[1].replace(/\s/g, ""));
    const record = Number(input[1].split(":")[1].replace(/\s/g, ""));

    let accNumberOfWays = 0;

    let currentHoldTime = 0;

    while (currentHoldTime <= time) {
      if (distance(time, currentHoldTime) > record) {
        accNumberOfWays++;
      }
      currentHoldTime++;
    }

    console.log(accNumberOfWays);
    console.timeEnd("Took");
  } catch (err) {
    console.error(err);
  }
};

const distance = (raceTime, holdTime) => {
  return raceTime * holdTime - holdTime ** 2;
};

main();
