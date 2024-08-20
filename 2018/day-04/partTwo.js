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

    // find the guard and minute with maximum overlap
    let maxMinuteFrequency = 0;
    let bestGuard = null;
    let bestMinute = null;

    for (let guard in guardSleepData) {
      guardSleepData[guard].forEach((minuteFrequency, minute) => {
        if (minuteFrequency > maxMinuteFrequency) {
          maxMinuteFrequency = minuteFrequency;
          bestGuard = guard;
          bestMinute = minute;
        }
      });
    }

    // result
    const guardId = parseInt(bestGuard.substring(1));
    const result = guardId * bestMinute;
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

main();
