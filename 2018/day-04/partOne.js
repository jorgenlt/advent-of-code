
import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("test.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((e) => {
        const dateStr = e
          .split("]")[0]
          .replace("[", "")
          .replace("1518", "1970");

        const timeStamp = new Date(dateStr).getTime();

        const event = e.split("]")[1].trim();
        let newEvent;

        if (/\d+/.test(event)) {
          newEvent = event.match(/\d+/)[0];
        } else if (event === "falls asleep") {
          newEvent = "#";
        } else if (event === "wakes up") {
          newEvent = ".";
        }

        return [timeStamp, newEvent];
      });

    // Sort by date
    input.sort((a, b) => a[0] - b[0]);

    // Map to save data
    // const guardData = new Map();


    // Find the guard that has the most minutes asleep. 
    // What minute does that guard spend asleep the most?

    // set current guard
    // find next asleep #
    // set minute fell asleep 
    // i+1 will be wake up, find minute wake up
    // minute wake up - minute asleep = asleep
    // save to currentAsleep
    // let currentAsleep = []
    // when new guard, save result in map. reset current counters

    // find guard with most minutes asleep




    // console.log(guardData);
    console.log(input);
  } catch (err) {
    console.error(err);
  }
};

main();
