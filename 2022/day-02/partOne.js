import { readFile } from "fs/promises";

const SCORES = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
};

const gameScore = (opponent, you) => {
  if (SCORES[opponent] === SCORES[you]) {
    return 3 + SCORES[you];
  }

  switch (opponent) {
    case "A":
      if (you === "Y") {
        return 6 + SCORES[you];
      } else {
        return SCORES[you];
      }
    case "B":
      if (you === "Z") {
        return 6 + SCORES[you];
      } else {
        return SCORES[you];
      }
    case "C":
      if (you === "X") {
        return 6 + SCORES[you];
      } else {
        return SCORES[you];
      }
    default:
      console.error("Invalid game.");
      break;
  }
};

const main = async () => {
  try {
    const games = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((e) => e.split(" "));

    let totalScore = 0;

    games.forEach((game) => {
      const [opponent, you] = game;
      totalScore += gameScore(opponent, you);
    });

    console.log(totalScore);
  } catch (err) {
    console.error(err);
  }
};

main();
