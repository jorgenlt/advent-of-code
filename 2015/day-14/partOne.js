import { readFile } from "fs/promises";

const parseInput = (input) => {
  const data = {};

  input.split("\n").forEach((line) => {
    const reindeer = line.split(" ")[0];
    const [speed, duration, rest] = line.match(/\d+/g).map(Number);

    data[reindeer] = { speed, duration, rest };
  });

  return data;
};

const getDistance = (reindeerObj, seconds) => {
  const { speed, duration, rest } = reindeerObj;

  let distance = 0;
  let restingTime = rest;
  let flyingTime = duration;

  for (let i = 0; i < seconds; i++) {
    if (distance === 0 || flyingTime > 0) {
      flyingTime--;
      distance += speed;
      if (flyingTime === 0) {
        restingTime = rest;
      }
    } else {
      restingTime--;
      if (restingTime === 0) {
        flyingTime = duration;
      }
    }
  }

  return distance;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    const data = parseInput(input);

    const maxDistance = Object.values(data).reduce((max, reindeer) => {
      const distance = getDistance(reindeer, 2503);
      return distance > max ? distance : max;
    }, 0);

    console.log(maxDistance);
  } catch (err) {
    console.error(err);
  }
};

main();
