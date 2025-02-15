import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input.match(/\d+/g).map(Number);
};

const initializeRegister = (players) => {
  const register = new Map();

  for (let i = 1; i <= players; i++) {
    register.set(i, 0);
  }

  return register;
};

const getCircularIndex = (index, arrayLength) => {
  // Use modulo to find the wrapped index
  const wrappedIndex = index % arrayLength;

  // If wrappedIndex is negative, adjust to get the positive index
  return wrappedIndex >= 0 ? wrappedIndex : wrappedIndex + arrayLength;
};

const solvePuzzle = (input) => {
  let [totalPlayers, lastMarble] = parseInput(input);

  lastMarble *= 100;

  const register = initializeRegister(totalPlayers);

  const circle = [0];

  let currentMarble = 0;
  let currentMarbleIndex = circle.indexOf(currentMarble);
  let nextMarble = 1;
  let currentPlayer = 1;

  while (nextMarble <= lastMarble) {
    console.log(`${Math.ceil((currentMarble / lastMarble) * 100)} %`);

    if (nextMarble % 23 === 0) {
      let score = nextMarble;
      nextMarble++;

      const removalIndex = getCircularIndex(
        currentMarbleIndex - 7,
        circle.length
      );
      score += circle[removalIndex];
      circle.splice(removalIndex, 1);

      currentMarbleIndex = removalIndex;
      currentMarble = circle[currentMarbleIndex];

      register.set(currentPlayer, register.get(currentPlayer) + score);
    } else {
      const placeMarbleIndex = getCircularIndex(
        currentMarbleIndex + 2,
        circle.length
      );

      circle.splice(placeMarbleIndex, 0, nextMarble);
      currentMarble = nextMarble;
      currentMarbleIndex = placeMarbleIndex;
      nextMarble++;
    }

    if (currentPlayer === totalPlayers) {
      currentPlayer = 1;
    } else {
      currentPlayer++;
    }
  }

  return Math.max(...register.values());
};

const main = async () => {
  try {
    const input = await readFile("input.txt", "utf-8");

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
