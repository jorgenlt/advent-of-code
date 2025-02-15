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

const solvePuzzle = (input) => {
  let [totalPlayers, lastMarble] = parseInput(input);

  lastMarble *= 100;

  const register = initializeRegister(totalPlayers);

  const circle = new Map();
  circle.set(0, { prev: 0, next: 0 });

  let currentMarble = 0;
  let currentPlayer = 1;

  for (let marble = 1; marble <= lastMarble; marble++) {
    if (marble % 23 === 0) {
      let score = marble;
      let removal = currentMarble;

      for (let i = 0; i < 7; i++) {
        removal = circle.get(removal).prev;
      }

      score += removal;

      const { prev: removalPrev, next: removalNext } = circle.get(removal);
      circle.get(removalPrev).next = removalNext;
      circle.get(removalNext).prev = removalPrev;
      circle.delete(removal);

      currentMarble = removalNext;

      register.set(currentPlayer, register.get(currentPlayer) + score);
    } else {
      const node1 = circle.get(currentMarble).next;
      const node2 = circle.get(node1).next;

      circle.set(marble, { prev: node1, next: node2 });
      circle.get(node1).next = marble;
      circle.get(node2).prev = marble;

      currentMarble = marble;
    }
    currentPlayer = currentPlayer === totalPlayers ? 1 : currentPlayer + 1;
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
