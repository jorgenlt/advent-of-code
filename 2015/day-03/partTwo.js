const fs = require("node:fs/promises");

const DIRECTIONS = {
  "^": [0, 1],
  v: [0, -1],
  ">": [1, 0],
  "<": [-1, 0],
};

const main = async () => {
  const input = (await fs.readFile("input.txt", "utf8")).trim().split("");

  const visitedHouses = new Map();

  const start = [0, 0];

  let currentSanta = start;
  let currentRoboSanta = start;

  // Save coordinate as string
  visitedHouses.set(start.join(), 2);

  input.forEach((dir, i) => {
    const [dx, dy] = DIRECTIONS[dir];

    if (i % 2 === 0) {
      currentSanta = [currentSanta[0] + dx, currentSanta[1] + dy];
      visitedHouses.set(
        currentSanta.join(),
        (visitedHouses.has(currentSanta.join()) || 0) + 1
      );
    } else {
      currentRoboSanta = [currentRoboSanta[0] + dx, currentRoboSanta[1] + dy];
      visitedHouses.set(
        currentRoboSanta.join(),
        (visitedHouses.has(currentRoboSanta.join()) || 0) + 1
      );
    }
  });

  console.log("houses with at least one present:", visitedHouses.size);
};

main();
