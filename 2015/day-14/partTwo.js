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

const createLeaderBoard = (data) => {
  const leaderBoard = {};

  Object.keys(data).forEach((competitor) => {
    leaderBoard[competitor] = { distance: 0, points: 0 };
  });

  return leaderBoard;
};

const findReindeerWithHighestDistance = (leaderBoard) => {
  let maxDistance = 0;
  let maxDistanceReindeers = [];

  for (const reindeer in leaderBoard) {
    if (leaderBoard[reindeer].distance > maxDistance) {
      maxDistance = leaderBoard[reindeer].distance;
      maxDistanceReindeers = [reindeer];
    } else if (leaderBoard[reindeer].distance === maxDistance) {
      maxDistanceReindeers.push(reindeer);
    }
  }

  return maxDistanceReindeers;
};

const findHighestPoints = (leaderBoard) => {
  let maxPoints = 0;

  for (const reindeer in leaderBoard) {
    if (leaderBoard[reindeer].points > maxPoints) {
      maxPoints = leaderBoard[reindeer].points;
    }
  }

  return maxPoints;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();
    const data = parseInput(input);
    const leaderBoard = createLeaderBoard(data);

    for (let i = 1; i <= 2503; i++) {
      for (const reindeer in leaderBoard) {
        const distance = getDistance(data[reindeer], i);

        leaderBoard[reindeer].distance = distance;
      }
      const leaders = findReindeerWithHighestDistance(leaderBoard);

      leaders.forEach((leader) => {
        leaderBoard[leader].points++;
      });
    }

    console.log(findHighestPoints(leaderBoard));
  } catch (err) {
    console.error(err);
  }
};

main();
