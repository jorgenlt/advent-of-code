import { readLines } from "../utils/readLines.js";

const main = async () => {
  try {
    const input = await readLines("input.txt");

    const time = input[0].split(":")[1].split(" ").filter(Boolean).map(Number);

    const record = input[1]
      .split(":")[1]
      .split(" ")
      .filter(Boolean)
      .map(Number);

    const accNumberOfWays = [];

    // Loop through each race
    for (let i = 0; i < time.length; i++) {
      let numberOfWays = 0;
      let raceTime = time[i];
      let raceRecord = record[i];
      let currentHoldTime = 0;

      while (currentHoldTime <= raceTime) {
        if (distance(raceTime, currentHoldTime) > raceRecord) {
          numberOfWays++;
        }
        currentHoldTime++;
      }

      accNumberOfWays.push(numberOfWays);
    }

    console.log(accNumberOfWays.reduce((acc, curr) => acc * curr));
  } catch (err) {
    console.error(err);
  }
};

const distance = (raceTime, holdTime) => {
  return raceTime * holdTime - holdTime ** 2;
};

main();
