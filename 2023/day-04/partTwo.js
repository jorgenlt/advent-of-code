import { readLines } from "../utils/readLines.js";

const main = async () => {
  try {
    const input = await readLines("input.csv");
    totalScratchcards(input);
  } catch (err) {
    console.error(err);
  }
};

const totalScratchcards = (input) => {
  let cards = new Map();
  let total = 0;

  const processedInput = input.map((line, i) => {
    const lineSplit = line.split(":");
    const [winningNums, cardNums] = lineSplit[1].split("|").map(e => new Set(e.trim().replaceAll('  ', ' ').split(" ")));
    return {id: i + 1, winningNums, cardNums};
  });

  for(let i = processedInput.length - 1; i >= 0; i--) {
    const { id, winningNums, cardNums } = processedInput[i];

    const commonNums = [...cardNums].filter(e => winningNums.has(e));
    cards.set(id, commonNums.length);

    let current = cards.get(id);
    for(let k = id + 1; k <= id + cards.get(id); k++) {
        current += cards.get(k);
    }
    total += 1 + current;
    cards.set(id, current);
  }

  console.log(total);
}

// Call the main function
main();
