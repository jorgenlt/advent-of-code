import { readFile } from "fs/promises";

const SCORES = {
  A: 1,
  B: 2,
  C: 3,
};

const OUTCOMES = {
  X: "lose",
  Y: "draw",
  Z: "win",
};

const SHAPE_TO_OUTCOME = {
  A: { win: "B", lose: "C", draw: "A" },
  B: { win: "C", lose: "A", draw: "B" },
  C: { win: "A", lose: "B", draw: "C" },
};

const gameScore = (opponent, result) => {
  const you = SHAPE_TO_OUTCOME[opponent][OUTCOMES[result]];

  if (opponent === you) {
    return 3 + SCORES[you];
  }

  return (opponent === SHAPE_TO_OUTCOME[you].lose ? 6 : 0) + SCORES[you];
};

const main = async () => {
  try {
    const games = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((e) => e.split(" "));

    let totalScore = 0;

    games.forEach((game) => {
      const [opponent, result] = game;
      totalScore += gameScore(opponent, result);
    });

    console.log(totalScore);
  } catch (err) {
    console.error(err);
  }
};

main();
