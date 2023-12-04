import { readLines } from "../utils/readLines.js";

const main = async () => {
  try {
    const input = await readLines("input.csv");

    totalPointsFromCards(input);
  } catch (err) {
    console.error(err);
  }
};

const totalPointsFromCards = (cards) => {
  let totalPoints = 0;

  cards.forEach((card) => {
    const winningNumbers = new Set(
      card.split("|")[0].trim().split(" ").slice(2).filter(Boolean).map(Number)
    );
    const cardNumbers = new Set(
      card.split("|")[1].split(" ").slice(1).filter(Boolean).map(Number)
    );
    const commonNums = [...winningNumbers].filter((num) =>
      cardNumbers.has(num)
    );

    if (commonNums.length === 1) {
      totalPoints++;
    } else if (commonNums.length > 1) {
      totalPoints += 2 ** (commonNums.length - 1);
    }
  });
  console.log(totalPoints);
};

// Call the main function
main();
