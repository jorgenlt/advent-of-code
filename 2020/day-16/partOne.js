import { readFile } from "fs/promises";

const parseInput = (input) => {
  const [section1, section2, section3] = input.split("\n\n");

  const rules = {};
  section1.split("\n").forEach((l) => {
    const [name, values] = l.split(": ");
    const [a, b, c, d] = values.match(/\d+/g).map(Number);

    rules[name] = [
      [a, b],
      [c, d],
    ];
  });

  const yourTicket = section2.match(/\d+/g).map(Number);

  const nearbyTickets = section3
    .split("\n")
    .slice(1)
    .map((ticket) => ticket.match(/\d+/g).map(Number));

  return {
    rules,
    yourTicket,
    nearbyTickets,
  };
};

const isValidValue = (value, rules) => {
  let isValid = false;

  for (const [name, rule] of Object.entries(rules)) {
    for (const range of rule) {
      if (value >= range[0] && value <= range[1]) {
        isValid = true;
      }
    }
  }

  return isValid;
};

const solvePuzzle = (input) => {
  const { rules, nearbyTickets } = parseInput(input);

  let errorRate = 0;

  for (const ticket of nearbyTickets) {
    for (const value of ticket) {
      if (!isValidValue(value, rules)) {
        errorRate += value;
      }
    }
  }

  return errorRate;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
