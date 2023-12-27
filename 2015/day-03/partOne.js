import fs from 'fs/promises'

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
  let current = start;

  // Save coordinate as string
  visitedHouses.set(start.join(), 1);

  input.forEach((dir) => {
    const [dx, dy] = DIRECTIONS[dir];

    current = [current[0] + dx, current[1] + dy];

    visitedHouses.set(
      current.join(),
      (visitedHouses.has(current.join()) || 0) + 1
    );
  });

  const housesWithAtLeastOnePresent = visitedHouses.size;

  console.log(housesWithAtLeastOnePresent);
};

main();
