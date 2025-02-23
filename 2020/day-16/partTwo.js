import { readFile } from "fs/promises";

const parseInput = (input) => {
  const [section1, section2, section3] = input.split("\n\n");

  const rules = new Map();
  section1.split("\n").forEach((l) => {
    const [name, values] = l.split(": ");
    const [a, b, c, d] = values.match(/\d+/g).map(Number);

    rules.set(name, [
      [a, b],
      [c, d],
    ]);
  });

  const yourTicket = section2.match(/\d+/g).map(Number);

  const nearbyTickets = [];

  section3
    .split("\n")
    .slice(1)
    .forEach((l) => {
      const ticket = l.match(/\d+/g).map(Number);

      let isValid = true;

      for (const value of ticket) {
        if (!isValidValue(value, rules)) {
          isValid = false;
        }
      }

      if (isValid) {
        nearbyTickets.push(ticket);
      }
    });

  return {
    rules,
    yourTicket,
    nearbyTickets,
  };
};

const isValidValue = (value, rules) => {
  let isValid = false;

  for (const rule of rules.values()) {
    for (const range of rule) {
      if (value >= range[0] && value <= range[1]) {
        isValid = true;
      }
    }
  }

  return isValid;
};

const getValuesAtIndex = (array, index) => {
  const result = [];

  array.forEach((e) => {
    result.push(e[index]);
  });

  return result;
};

const isRuleValid = (value, rule) => {
  let isValid = false;

  if (
    (value >= rule[0][0] && value <= rule[0][1]) ||
    (value >= rule[1][0] && value <= rule[1][1])
  ) {
    isValid = true;
  }

  return isValid;
};

const findCandidateRules = (values, rules) => {
  const rulesCopy = new Map(rules);

  for (const value of values) {
    for (const [name, rule] of rulesCopy) {
      if (!isRuleValid(value, rule)) {
        rulesCopy.delete(name);
      }
    }
  }

  return [...rulesCopy.keys()];
};

const createRulesRegister = (rules, nearbyTickets) => {
  const ticketLength = nearbyTickets[0].length;
  const rulesRegister = new Map();

  while (rules.size > 0) {
    for (let i = 0; i < ticketLength; i++) {
      const values = getValuesAtIndex(nearbyTickets, i);
      const candidateRules = findCandidateRules(values, rules);

      if (candidateRules.length === 1) {
        const foundRule = candidateRules[0];
        rulesRegister.set(foundRule, i);
        rules.delete(foundRule);
      }
    }
  }

  return rulesRegister;
};

const multiplyDepartureValues = (rulesRegister, ticket) => {
  let result = [];

  for (const [rule, index] of rulesRegister) {
    if (rule.startsWith("departure")) {
      result.push(ticket[index]);
    }
  }

  return result.reduce((prev, curr) => prev * curr);
};

const solvePuzzle = (input) => {
  const { rules, yourTicket, nearbyTickets } = parseInput(input);

  const rulesRegister = createRulesRegister(rules, nearbyTickets);

  return multiplyDepartureValues(rulesRegister, yourTicket);
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
