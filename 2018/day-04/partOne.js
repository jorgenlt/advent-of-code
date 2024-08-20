import { readFile } from "fs/promises";

const main = async () => {
  try {
    const records = (await readFile("input.txt", "utf-8")).trim().split("\n");

    // parse and sort
    const sortedRecords = records.sort();

    let guardSleepData = {};
    let currentGuard = null;
    let sleepStart = null;

    for (let record of sortedRecords) {
      let minute = parseInt(record.substring(15, 17));
      if (record.includes("begins shift")) {
        currentGuard = record.match(/#\d+/)[0];
        if (!guardSleepData[currentGuard]) {
          guardSleepData[currentGuard] = Array(60).fill(0);
        }
      } else if (record.includes("falls asleep")) {
        sleepStart = minute;
      } else if (record.includes("wakes up")) {
        for (let i = sleepStart; i < minute; i++) {
          guardSleepData[currentGuard][i]++;
        }
      }
    }

    // guard who slept the most
    let maxSleep = 0;
    let sleepiestGuard = null;

    for (let guard in guardSleepData) {
      const totalSleep = guardSleepData[guard].reduce((a, b) => a + b, 0);
      if (totalSleep > maxSleep) {
        maxSleep = totalSleep;
        sleepiestGuard = guard;
      }
    }

    // find the minute that the sleepiest guard slept the most
    let sleepiestMinute = guardSleepData[sleepiestGuard].indexOf(
      Math.max(...guardSleepData[sleepiestGuard])
    );

    // result
    const guardId = parseInt(sleepiestGuard.substring(1));
    const result = guardId * sleepiestMinute;
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

main();
